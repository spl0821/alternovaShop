function loadProducts() {
    let html = "";
    let products = [];
    let total_price = 0;
    fetch('products.json').then(response=>{
        return response.json();
    }).then(jsonData => {
        products = jsonData.products;
        products.forEach((product, index) => {
            html += '<div class="card mb-2">' +
                        `<img src="../assets/watch.jpg" class="card-img-top" alt="...">` +
                        '<div class="card-body">' +
                            `<h5 class="card-title">${product.name}</h5>` +
                        '</div>' +
                        '<div class="container text-center">' +
                            '<div class="row row__addcart">' +
                            `<div class="col"><div class="form-floating"><input id="input_${index}" type="number" class="form-control" id="floatingInput" placeholder="quantity" min="0"><label for="floatingInput"></label></div></div>` +
                            `<div class="col col__addcart"><button disabled id="btn_${index}" type="button" class="btn btn__addcart btn-danger">Add to cart</button></div>` +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    
        });
        document.getElementById("products").innerHTML = html;
        products.forEach((product, index)=>{
            product.stock == 0 ? document.getElementById(`input_${index}`).disabled = true : document.getElementById(`input_${index}`).disabled = false;
            document.getElementById(`btn_${index}`).addEventListener("click", (e) => {
                const table = document.getElementById("table_body");
                const collection = [...table.getElementsByTagName("th")];
                const found = collection.find(el => el.innerHTML === product.name)
                const product_index = collection.findIndex(el=> el.innerHTML == product.name);
                
                if(!table.getElementsByTagName("tr").length){
                    table.innerHTML = '<tr>' +
                                    `<th scope="row">${product.name}</th>` +
                                    `<td>${document.getElementById(`input_${index}`).value}</td>` +
                                    `<td>${product.unit_price}</td>` +
                                    `<td>${document.getElementById(`input_${index}`).value * product.unit_price}</td>` +
                                '</tr>';
                }else{
                    if(found === undefined){
                        table.insertRow(-1).innerHTML = '<tr>' +
                                                                     `<th scope="row">${product.name}</th>` +
                                                                     `<td>${document.getElementById(`input_${index}`).value}</td>` +
                                                                     `<td>${product.unit_price}</td>` +
                                                                     `<td>${document.getElementById(`input_${index}`).value * product.unit_price}</td>` +
                                                                 '</tr>';
                    }else{
                        table.getElementsByTagName("tr")[product_index].innerHTML = '<tr>' +
                                                                                    `<th scope="row">${product.name}</th>` +
                                                                                    `<td>${document.getElementById(`input_${index}`).value}</td>` +
                                                                                    `<td>${product.unit_price}</td>` +
                                                                                    `<td>${document.getElementById(`input_${index}`).value * product.unit_price}</td>` +
                                                                                '</tr>';
                        
                    }  
                }

                const trs = [...table.getElementsByTagName("tr")];
                trs.forEach(tr=>{
                    var cells = [...tr.cells]
                    total_price += Number(cells[3].innerHTML);
                })

                document.getElementById(`input_${index}`).value = null;
                document.getElementById(`btn_${index}`).disabled = true;
                document.getElementById("total").value = total_price;
            });

            document.getElementById(`input_${index}`).addEventListener("input", (e) => {
                const table = document.getElementById("table_body");
                const collection = [...table.getElementsByTagName("th")];
                const found = collection.find(el => el.innerHTML === product.name)
                const product_index = collection.findIndex(el=> el.innerHTML == product.name);
                if(e.target.value !== '' && e.target.value > 0){
                    document.getElementById(`btn_${index}`).disabled = false;
                }
                else if(found !== undefined && e.target.value == 0){
                    table.deleteRow(product_index);
                }
                else{
                    document.getElementById(`btn_${index}`).disabled = true;
                }
            });
        })
    })

    document.getElementById("btn_order").addEventListener('click', () => {
        const table = document.getElementById("table_body");
        const collection = [...table.getElementsByTagName("tr")];
        if(collection.length){
            let products = [];
            collection.forEach(tr=>{
                let collectionCells = [...tr.cells];
                products.push({
                    name: collectionCells[0].innerText,
                    quantity: collectionCells[1].innerText,
                    total: collectionCells[3].innerText
                })
            })
        }
        products['total'] = document.getElementById("total").value;
    })
}


