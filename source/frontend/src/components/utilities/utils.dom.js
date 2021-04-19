
function SelectItem(id,items){
    for (let item of items) {
        if(item.id===id){
            item.classList.add("selected");
        }
    }
}

function UnselectItems(items){
    for (let item of items) {
        item.classList.remove("selected");
    }
}

function AddClass(id,className){
    let element = document.querySelector('#' + id);
    element.classList.add(className);
}

function RemoveClass(id,className){
    let element = document.querySelector('#' + id);
    element.classList.remove(className);
}

function ToggleClass(id,className){
    let element = document.querySelector('#' + id);
    element.classList.toggle(className);
}

const UtilsDom = {
    SelectItem: SelectItem,
    UnselectItems: UnselectItems,
    AddClass: AddClass,
    RemoveClass: RemoveClass,
    ToggleClass: ToggleClass
}

export default UtilsDom;