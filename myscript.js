let addBtnContainer=document.querySelector(".add_sheet_container")
let sheetlist=document.querySelector(".sheet_list")
let firstsheet=document.querySelector(".sheet")
let Allcells=document.querySelectorAll(".grid .col")
let addressBar=document.querySelector(".address_box")
//let textalign=document.querySelectorAll(".allignment_container")
let color=document.querySelector(".color")
let bgcolor=document.querySelector(".bg-color")
let formulaInput=document.querySelector(".formula_box")
let allAlignBtns = document.querySelectorAll(".alignment-container>input");
let leftBtn=document.querySelector(".left");
let rightBtn=document.querySelector(".right");
let centerBtn=document.querySelector(".center");
let boldElement=document.querySelector(".bold");
let italicElement=document.querySelector(".italic");
let underlineElement=document.querySelector(".underline");
let fontBtn=document.querySelector(".font-size")
let fontFamily=document.querySelector(".font_family")
let sheetDB=workSheetDB[0]
firstsheet.addEventListener("click",handlesheet)
addBtnContainer.addEventListener("click",changesheet);
//crete sheet
function changesheet(e)
{
    let sheetArr=document.querySelectorAll(".sheet")
    let lastSheetEle=sheetArr[sheetArr.length-1]
    let idx=lastSheetEle.getAttribute("sheetIdx")
    idx=Number(idx)
    let newsheet=document.createElement("div")
    newsheet.setAttribute("class","sheet")
    newsheet.setAttribute("sheetIdx",idx+1)
    newsheet.innerText=`Sheet ${idx+1}`
    sheetlist.appendChild(newsheet)
    sheetArr.forEach(function(sheet){
        sheet.classList.remove("active_sheet");
    })
    sheetArr=document.querySelectorAll(".sheet");
    sheetArr[sheetArr.length-1].classList.add("active_sheet");
    initCurrentSheetDB();
    sheetDB=workSheetDB[idx];
    initUI();
    newsheet.addEventListener("click",handlesheet) 
    
}
//make sheet active
function handlesheet(e)
{
    let mysheet= e.currentTarget
    let sheetArr=document.querySelectorAll(".sheet")
    sheetArr.forEach(function (sheet)
    {
        sheet.classList.remove("active_sheet")
    })
    if(!mysheet.classList[1])
    {
    mysheet.classList.add("active_sheet")
    }
    let sheetIdx = mysheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx - 1];
    setUI(sheetDB);
}
//Its address display on address bar
for(let i=0;i<Allcells.length;i++)
{
    Allcells[i].addEventListener("click",function handlecell()
    {
        
        let rid=Number(Allcells[i].getAttribute("rid"))
        let cid=Number(Allcells[i].getAttribute("cid"))
        let coladdress=String.fromCharCode(cid+97)
        let rowaddress=rid+1
        let address=coladdress+rowaddress
        addressBar.value=address
        Allcells[i].style.border = "2px solid green"
        let cellObject=sheetDB[rid][cid]
        if(cellObject.bold==true)
        {
            boldElement.classList.add("active-btn")
        }
        else
        {
            boldElement.classList.remove("active-btn")
        }
        if(cellObject.italic==true)
        {
            italicElement.classList.add("active-btn")
        }
        else
        {
            italicElement.classList.remove("active-btn")
        }
        if(cellObject.underline==true)
        {
            underlineElement.classList.add("active-btn")
        }
        else
        {
            underlineElement.classList.remove("active-btn")
        }
        if(cellObject.formula!="")
        {
            formulaInput.value=cellObject.formula
        }
        else
        {
            formulaInput.value=""
        }
    
    })
}
//making left alligned
leftBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
    for(let i=0;i<allAlignBtns.length;i++){
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    let cellObject=sheetDB[rid][cid];
    cellObject.halign="left";
})
//making centre alligned
centerBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";
    for(let i=0;i<allAlignBtns.length;i++){
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject=sheetDB[rid][cid];
    cellObject.halign="center";
})
//making right alligned
rightBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";
    for(let i=0;i<allAlignBtns.length;i++){
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    let cellObject=sheetDB[rid][cid];
    cellObject.halign="right";
})
//making bold text
boldElement.addEventListener("click", function(){
    let isActive=boldElement.classList.contains("active-btn")
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDB[rid][cid]
    if(isActive==false)
        {
            cell.style.fontWeight="bold";  
            boldElement.classList.add("active-btn")
            cellObject.bold=true

        }
    else
        {
            cell.style.fontWeight="normal";  
            boldElement.classList.remove("active-btn")
            cellObject.bold=false

        }
})
//making italic text
italicElement.addEventListener("click", function(){
    let isActive=italicElement.classList.contains("active-btn")
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDB[rid][cid]
    if(isActive==false)
        {
            cell.style.fontStyle="italic";  
            italicElement.classList.add("active-btn")
            cellObject.bold=true
        }
    else
        {
            cell.style.fontStyle="normal";  
            italicElement.classList.remove("active-btn")
            cellObject.bold=false
        }
})
//making text underlined
underlineElement.addEventListener("click", function(){
    let isActive=underlineElement.classList.contains("active-btn")
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDB[rid][cid]
    if(isActive==false)
        {
            cell.style.textDecoration="underline";  
            underlineElement.classList.add("active-btn")
            cellObject.bold=true
        }
    else
        {
            cell.style.textDecoration="none";  
            underlineElement.classList.remove("active-btn")
            cellObject.bold=false
        }
})
//making changes in font
fontBtn.addEventListener("change",function()
{
    fontsize=fontBtn.value
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=fontsize+"px";
})
//add font family
fontFamily.addEventListener("change",function()
{
    fontfam=fontFamily.value
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily=fontfam;
})
color.addEventListener("change",function()
{
    let mycolor=color.value
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color=mycolor

})
bgcolor.addEventListener("change",function()
{
    let mybg=bgcolor.value
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor=mybg
})
// getting rid and cid of a cell

function initUI(){
    for(let i=0;i<Allcells.length;i++){
        Allcells[i].style.fontWeight="normal";
         Allcells[i].style.fontStyle="normal";
         Allcells[i].style.textDecoration="none";
         Allcells[i].style.fontSize="16px";
         Allcells[i].style.textAlign="left";
         Allcells[i].innerText="";
     }
}

function setUI(sheetDB){
     for(let i=0;i<sheetDB.length;i++){
         for(let j=0;j<sheetDB[i].length;j++){
            let cell=document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let{bold,italic,underline,fontFamily,fontSize,textAlign,value}=sheetDB[i][j];
            cell.style.fontWeight=bold==true?"bold":"normal";
            cell.style.fontStyle=italic==true?"italic":"normal";
            cell.style.textDecoration=underline==true?"underline":"none";
            cell.innerText=value;

         }
     }
}


//************************Formula bar
for(let i=0;i<Allcells.length;i++)
{
    Allcells[i].addEventListener("blur",function handlecell()
    {   
        let address=addressBar.value;
       let {rid,cid}=getRidCidFronAddress(address);
        let cellObject=sheetDB[rid][cid];
        let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        if (cellObject.value == cell.innerText) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject, address);
        }
        // db entry
        cellObject.value = cell.innerText;
        // depend update 
        changeChildrens(cellObject);
});
}
formulaInput.addEventListener("keydown",function(e)
{
    if(e.key=="Enter" && formulaInput.value!="")
    {
        let Newformula = formulaInput.value;
        // cellObject formula
        let address = addressBar.value;
        // getCurrentCell
        let { rid, cid } = getRidCidFronAddress(address);
        let cellObject = sheetDB[rid][cid];
        let prevFormula = cellObject.formula;
        if (prevFormula == Newformula) {
            return;
        }
        if (prevFormula != "" && prevFormula != Newformula) {
            removeFormula(cellObject, address);
        }
        let evaluatedValue = evaluateFormula(Newformula);
        setUIByFormula(evaluatedValue, rid, cid);
        setFormula(evaluatedValue,Newformula,rid,cid,address)
        changeChildrens(cellObject);
    }

})
function evaluateFormula(formula) {
    // (A100+A20)
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++)
    {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 97 && firstCharOfToken <= 122)
        {
            // console.log(formulaTokens[i]);
            // A1
            let { rid, cid } = getRidCidFronAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            //  getting value from  db
            let { value } = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }
    console.log(formula)
    let ans = eval(formula);
    return ans;
}
function setUIByFormula(value, rid, cid) 
{
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
    //  parent add yourself as a
}
function setFormula(value,formula,rid,cid,address)
{
    let cellObject=sheetDB[rid][cid]
    cellObject.value=value
    cellObject.formula=formula
    let formulaTokens = formula.split(" ");
    //(A1 + A2)
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 97 && firstCharOfToken <= 122) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRidCidFronAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            cellObject.children.push(address)
        }
    }
}
function changeChildrens(cellObject)
{
    let childrens = cellObject.children;
    for (let i = 0; i < childrens.length; i++) {
        let chAddress = childrens[i];
        let chRICIObj = getRidCidFronAddress(chAddress);
        let chObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, chRICIObj.rid, chRICIObj.cid);
        chObj.value = evaluatedValue;
        // your children have children
        changeChildrens(chObj);
    }
}
function removeFormula(cellObject,address)
{
    //cellObject.value=value
    formula=cellObject.formula
    let formulaTokens = formula.split(" ");
    //(A1 + A2)
    for (let i = 0; i < formulaTokens.length; i++)
    {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 97 && firstCharOfToken <= 122)
        {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRidCidFronAddress(formulaTokens[i]);
            let parentcellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            let childrens=parentcellObject.children
            let idx=childrens.indexOf(address)
            childrens.splice(idx,1)
        }
    }
    cellObject.formula = "";
}








function getRidCidFronAddress(address)
{
    let cellcoladdress=address.charCodeAt(0);
    let cellrowaddress=address.slice(1);
    let cid=cellcoladdress-97;
    let rid=Number(cellrowaddress-1)
    return {cid,rid}
}

