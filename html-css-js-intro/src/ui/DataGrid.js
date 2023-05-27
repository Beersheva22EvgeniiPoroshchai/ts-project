export default class DataGrid {
    #tBodyIdElement
    #keys

        constructor(parentId, columns) {
        //columns - array of objects {field: <name of key>, headerName: <column name>}
        this.#keys=columns.map(c => c.field);
        this.#bildTableHeader(parentId, columns.map(c => c.headerName));
    }

    fillData(rowsData) {
        this.#tBodyIdElement.innerHTML = rowsData.map(elem => 
            `<tr>
                <td>${elem.date}</td>
                <td>${elem.time}</td>
                <td>${elem.temperature}</td>
                <td>${elem.apparentTemperature}</td>
             </tr>`).join('');
    }
    
    #bildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
        `<table>
            <thead>
                <tr>
                    ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                </tr>
            </thead>
            <tbody id="${parentId}-table">
            </tbody>     
        </table>`
        this.#tBodyIdElement = document.getElementById(parentId + "-table")


    }





}