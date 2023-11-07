export function createData(company_id, company_code, company_name, company_promotion, status) {
    return { company_id, company_code, company_name, company_promotion, status };
}

export function addRow(valueObjArr) {
    return valueObjArr.map(item => {
        return createData(
            item.company_id,
            item.company_code,
            item.company_name,
            item.company_promotion,
            item.status
        )
    })
}

export const headerTable = {
    company_id: "",
    company_code: "รหัสโครงการ",
    company_name: "ชื่อโครงการ",
    company_promotion: "โปร",
    status: "สถานะ"
}

export const headerVillagerListTable = {
    villager_id:"ปุ่ม",
    villager_code:"รหัสลูกบ้าน",
    home_address: "บ้านเลขที่",
    full_name:"ชื่อ-นามสกุล",
    tel_number:"เบอร์โทรศัพท์",
    status: "สถานะ",
}


export const getStatus = (status) => {
    switch (status) {
        case "NORMAL":
            return "สถานะพร้อมใช้งาน";
        case "EXPIRE":
            return "สถานะหมดอายุ";
        default:
            return "สถานะระงับการให้บริการ";
    }
}