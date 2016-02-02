//AcronymDictionary - For automatic expansion of acronyms.
//Copyright (C) 2016  Joel Whitcomb
//
//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program.  If not, see <http://www.gnu.org/licenses/>.


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
    var text = textNode.data;

    for (var key in AcronymLookup) {
        var replacedCount = 0;
        var search_regex = new RegExp("([^a-zA-Z]|^)(" + key + ")([^a-zA-Z]|$)", 'g');
        text = text.replace(search_regex, function () {
            replaced = true;
            replacedCount += 1;
            return createInfoPanel(search_regex, text)
        });
        if (replacedCount) {
            console.log("replaced " + key + " " + replacedCount + " times")
        }
    }
    if (replaced) {
        var newtext = document.createElement('div');
        newtext.className = "ADParent";
        newtext.innerHTML = text;
        textNode.parentNode.replaceChild(newtext, textNode)
    }
}

function createInfoPanel(search_regex, text) {

    //oh.. god... im doing the same regex search again.... why oh why
    var results = search_regex.exec(text);

    var key = results[2];
    var pre = results[1];
    var post = results[3];

    var expanded = AcronymLookup[key][0];
    var detailed = AcronymLookup[key][1];

    var box = "";

    if (detailed != undefined) {
        box = expanded + '<br>' + detailed
    } else {
        box = expanded
    }

    return pre + '<div class="AD"><div class="ADposition"><div class="ADINFO">' + box + '</div></div>' + key + '</div>' + post
}


window.onload = traverseChildNodes(document.documentElement);
