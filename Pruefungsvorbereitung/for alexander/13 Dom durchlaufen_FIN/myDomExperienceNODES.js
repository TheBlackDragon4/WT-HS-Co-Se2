"use strict";//Strict Mode verhindert, dass fehleranfällige Features verwendet werden
window.onload = init;//ruft die Funktion init auf, sobald das HTML Dokument vollständig geladen wurde
let bricks = [];
function init()
{
  domWalker(document.querySelector("body").firstElementChild);
  outPut();
}
function domWalker(actElem)
{
  if (isValidNode(actElem))
    readElement(actElem);
  if (actElem.hasChildNodes())
    domWalker(actElem.firstChild);
  if (actElem.nextSibling != null)
    domWalker(actElem.nextSibling);
}
function readElement(actItem)
{
  let tmpString = actItem.nodeName;
  tmpString += " (Element_Node) ";
  brickAdder(tmpString);
  if (actItem.attributes != null)
  {
    for (let i = 0; i < actItem.attributes.length; i++)
    {
      let tmpAttr = actItem.attributes.item(i);
      brickAdder("|_Attr: " + tmpAttr.name + " = " + tmpAttr.value);
    }
    if (!is_all_ws(actItem))      
    {
      brickAdder("|_#text(Text_Node): " + actItem.textNode);
    }
    brickAdder("_________"); //Trennstrich
  }
}
function brickAdder(txt) //das Array "bricks" ein neues html-Element hinzufügen
{
  let neuerAbsatz = document.createElement("p");
  neuerAbsatz.appendChild(document.createTextNode(txt));//Text über Knoten
  bricks.push(neuerAbsatz);
}
function outPut() //alle neuen html-Elemente dem Body hinzufügen
{
  for (let i = 0; i < bricks.length; i++)
  {
    document.body.appendChild(bricks[i]);
  }
}
function is_all_ws(nod) // Pruefung, ob Knoten nur Whitespace (ws) beinhaltet
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r]/.test(nod.textContent));
}
// Hier wird festgelegt, unter welchen Bedingungen ein
// Knoten nicht beachtet werden soll
function isValidNode(nod)
{
  return !((nod.nodeType == 8) || // Kommentar-Knoten
    (nod.nodeType == 3) ||// Text-Knoten
    (nod.nodeName == "SCRIPT")); // Skript-Knoten
}