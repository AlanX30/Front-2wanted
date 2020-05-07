export const Posiciones = (idRoot, userList) => {
    let myName = ''
    
    /* -----1 Level----- */
    
    let acum1 = 0
    const childsId1 = []
    const childsName1 = []

    for (let i = 0; i<userList.length; i++) {
        const parentId = userList[i].parentId
        const Id = userList[i].id
        const name = userList[i].name
        if (parentId === idRoot){
            childsId1.push(Id)
            childsName1.push(name)
            acum1 = acum1 + userList[i].ingreso

        }
        if(Id === idRoot){
            myName = name
        }
    }
    for(let i = 0; i<2; i++){
        if(childsName1[i] === undefined){
            childsName1[i] = 'Posicion Vacia'
        }
    }

    /* -----/1 Level----- */

    /* -----2 Level----- */
    
    let acum2 = 0
    const childsId2 = []
    const childsName2 = []
    

    for (let i = 0; i<childsId1.length; i++) {
        for(let j = 0; j<userList.length; j++){
            const parentId = userList[j].parentId
            const Id = userList[j].id
            const name = userList[j].name
            if(parentId === childsId1[i]){
                childsId2.push(Id)
                childsName2.push(name)
                acum2 = acum2 + userList[j].ingreso
            }
        }  
    }

    for(let i = 0; i<4; i++){
        if(childsName2[i] === undefined){
            childsName2[i] = 'Posicion Vacia'
        }
    }

    /* -----/2 Level----- */

    /* -----3 Level----- */

    let acum3 = 0
    const childsId3 = []
    const childsName3 = []

    for (let i = 0; i<childsId2.length; i++) {
        for(let j = 0; j<userList.length; j++){
            const parentId = userList[j].parentId
            const Id = userList[j].id
            const name = userList[j].name
            if(parentId === childsId2[i]){
                childsId3.push(Id)
                childsName3.push(name)
                acum3 = acum3 + userList[j].ingreso
            }
        }  
    }

    for(let i = 0; i<8; i++){
        if(childsName3[i] === undefined){
            childsName3[i] = 'Posicion Vacia'
        }
    }

    
    /* -----/3 Level----- */
    
    /* -----4 Level----- */
    
    let acum4 = 0
    const childsId4 = []
    const childsName4 = []

    for (let i = 0; i<childsId3.length; i++) {
        for(let j = 0; j<userList.length; j++){
            const parentId = userList[j].parentId
            const Id = userList[j].id
            const name = userList[j].name
            if(parentId === childsId3[i]){
                childsId4.push(Id)
                childsName4.push(name)
                acum4 = acum4 + userList[j].ingreso
            }
        }  
    }

    for(let i = 0; i<16; i++){
        if(childsName4[i] === undefined){
            childsName4[i] = 'Posicion Vacia'
        }
    }
    
    /* -----/4 Level----- */
    
    /* -----5 Level----- */

    let acum5 = 0
    const childsId5 = []
    const childsName5 = []

    for (let i = 0; i<childsId4.length; i++) {
        for(let j = 0; j<userList.length; j++){
            const parentId = userList[j].parentId
            const Id = userList[j].id
            const name = userList[j].name
            if(parentId === childsId4[i]){
                childsId5.push(Id)
                childsName5.push(name)
                acum5 = acum5 + userList[j].ingreso
            }
        }  
    }

    for(let i = 0; i<32; i++){
        if(childsName5[i] === undefined){
            childsName5[i] = 'Posicion Vacia'
        }
    }
    /* -----/5 Level----- */
    
    
    const totalWin = acum3/2
    
    return {
        childsId1, childsName1, 
        childsId2, childsName2, 
        childsId3, childsName3, acum3,
        childsId4, childsName4, acum4, 
        childsId5, childsName5, acum5, 
        totalWin ,myName
    }

}

