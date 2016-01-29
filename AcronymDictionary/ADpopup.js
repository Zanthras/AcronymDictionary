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

    for (var key in AcronymLookup) {
        var replacedCount = 0;
        var search = new RegExp(key, 'g');
        textNode.data = textNode.data.replace(search, function () {
            replaced = true;
            replacedCount += 1;
            return createInfoPanel(key)
        });
        if (replacedCount) {
            console.log("replaced " + key + " " + replacedCount + " times");
        }
    }
    if (replaced) {
        textNode.parentNode.innerHTML = textNode.data;
    }
}

function createInfoPanel(key) {

    return '<div class="AD"><div class="ADposition"><div class="ADINFO">' + AcronymLookup[key][0] + '<br>' + AcronymLookup[key][1] + '</div></div>' + key + '</div>';
}


window.onload = traverseChildNodes(document.documentElement);
