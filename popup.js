document.addEventListener("DOMContentLoaded", function() {
    const originalInput = document.getElementById("original");
    const replacementInput = document.getElementById("replacement");
    const addButton = document.getElementById("add");
    const list = document.getElementById("list");

    function loadReplacements() {
        chrome.storage.sync.get("replacements", function(data) {
            list.innerHTML = "";
            const replacements = data.replacements || {};
            for (let key in replacements) {
                let item = document.createElement("li");
                item.textContent = key + " → " + replacements[key];
                let removeBtn = document.createElement("button");
                removeBtn.textContent = "❌";
                removeBtn.className = "delete-btn";
                removeBtn.onclick = function() {
                    delete replacements[key];
                    chrome.storage.sync.set({ replacements: replacements });
                    loadReplacements();
                };
                item.appendChild(removeBtn);
                list.appendChild(item);
            }
        });
    }

    addButton.onclick = function() {
        let original = originalInput.value.trim();
        let replacement = replacementInput.value.trim();
        if (original && replacement) {
            chrome.storage.sync.get("replacements", function(data) {
                let replacements = data.replacements || {};
                replacements[original] = replacement;
                chrome.storage.sync.set({ replacements: replacements });
                loadReplacements();
            });
        }
    };

    loadReplacements();
});
