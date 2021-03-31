
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

const UtilsDom = {
    SelectItem: SelectItem,
    UnselectItems: UnselectItems
}

export default UtilsDom;