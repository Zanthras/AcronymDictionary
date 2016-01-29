

function traverseChildNodes(node) {

    var next;

    // (Element node)
    if (node.nodeType === 1) {
        if (node = node.firstChild) {
            do {
                // Recursively call traverseChildNodes on each child node
                next = node.nextSibling;
                traverseChildNodes(node);
            } while(node = next);
        }
    // (Text node)
    } else if (node.nodeType === 3) {
        encapsulateAcronym(node)
    }
}

function encapsulateAcronym(textNode) {

    var replaced = false;

    for (var key in AcronymLookup) {
        var replacedCount = 0;
        textNode.data = textNode.data.replace(new RegExp(key, 'g'), function (token) {
            replaced = true;
            replacedCount += 1;
            return createInfoPanel(key)
        });
        if (replacedCount) {
            console.log("replaced " + key + " " + replacedCount + " times");
        }
    }
    if (replaced) {
        //var temp = document.createElement("div");
        //temp.innerHTML = textNode.data;
        //textNode.parentNode.insertBefore(temp, textNode.parentNode.firstChild);
        textNode.parentNode.innerHTML = textNode.data;
        //textNode.parentNode.removeChild(textNode);
    }
}

function createInfoPanel(key) {
    return '<div class="AD"><div class="ADINFO">' + AcronymLookup[key][0] + '<br>' + AcronymLookup[key][1] + '</div>' + key + '</div>';
}


window.onload = traverseChildNodes(document.documentElement);
