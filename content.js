chrome.storage.sync.get("replacements", function(data) {
    let replacements = data.replacements || {};
    let regexes = {};
    
    for (let key in replacements) {
        regexes[key] = new RegExp(key, "gi");
    }

    function replaceText(node) {
        if (node.nodeType === 3) {
            let text = node.nodeValue;
            for (let key in regexes) {
                text = text.replace(regexes[key], replacements[key]);
            }
            node.nodeValue = text;
        } else {
            for (let child of node.childNodes) {
                replaceText(child);
            }
        }
    }

    replaceText(document.body);
});

chrome.storage.onChanged.addListener(() => location.reload());
