const foodList = ["Bun mam", "Com chien", "Gio heo", "Pho", "Banh my"];
let food = foodList.slice(0, 3);
foodList.splice(0, 3);
console.log("Food: ", food);
console.log("FoodList: ", foodList);
function loadMore(list, amount) {
    let subList = [];
    if (list.length < amount) {
        subList = list.slice(0, list.length);
        list.splice(0, list.length);
    } else {
        subList = list.slice(0, amount - 1);
        list.splice(0, amount - 1);
    }
    console.log("subList: ", subList);
    console.log("list: ", list);
    return subList;
}

const loadMoreList = loadMore(foodList, 3);
if (!loadMoreList.length) {
    // display none
}

(async () => {
    try {
        const resCategories = await fetch("http://localhost:3000/categoryJsons");
        const categories = await resCategories.json();
        const resShops = await fetch("http://localhost:3000/shopJsons");
        const shops = await resShops.json();
        const shopee = {
            categories,
            shops,
        };

        const getShops = shopee.shops.map((shopJson) => shopJson);
        //get category of shop === category id
        const getCateByShop = shopee.categories.filter((categoryJson) => {
            return getShops.some((shop) => {
                return shop.category === categoryJson.id;
            });
        });
        const shopeeValue = {
            shopValue: getShops,
            categoryValue: getCateByShop,
        };

        const formatter = new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });

        // get category
        shopeeValue.categoryValue.map((category) => {
            const rightContainer = document.querySelector(
                ".content-container-right .container .right"
            );
            //create section right-wrapper
            const rightWrapper = document.createElement("section");
            rightWrapper.className = "right-wrapper";
            // create div: right__title
            let rightTitle = document.createElement("div");
            rightTitle.className = "right__title";
            // create span in right__title
            const spanTitle = document.createElement("span");
            // create tag b in spanTitle
            const spanTitleB = document.createElement("b");
            spanTitleB.innerText = `${category.categoryName}`;

            // push tab B into spanTitle
            spanTitle.appendChild(spanTitleB);
            // push spanTitle into rightTitle
            rightTitle.appendChild(spanTitle);
            // push rightTitle into rightWrapper
            rightWrapper.appendChild(rightTitle);
            // push rightWrapper into rightContainer
            rightContainer.appendChild(rightWrapper);

            // if category id === shop category
            const shopByCategory = shopeeValue.shopValue.filter((shop) => {
                return shop.category === category.id;
            });

            let shopListHtml = ``;
            // get each shop by category and renderData

            shopByCategory.forEach((shop) => {
                const cost = formatter.format(`${shop.cost}`);
                shopListHtml += `
                    <div class="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4 p-1 blogBox moreBox right-item" id="${shop.id}">
                        <a class="" href="#">
                            <img src="${shop.img}" alt="">
                            <div>
                                <div class="right-item__desc">
                                    <p class="m-0"title="${shop.shopName}">${shop.shopName}
                                    <p class="m-0"title="${shop.address}">${shop.address}</p>
                                </div>
                                <div class="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
                                    <div class="flex justify-content-start pl-1 pr-1">
                                        <i class="fas fa-tag pr-1 "></i>
                                        <p class="m-0">${cost}</p>
                                    </div>
                                    <div class="flex justify-content-start align-center pl-1 pr-1">
                                        <i class="fa fa-dollar pr-1"></i>
                                        <p class="m-0">Giá 40k</p>
                                    </div>
                                </div>
                                <div class="row flex justify-content-start flex-nowrap right-item__disc">
                                    <div class="flex justify-content-start align-center mr-1">
                                        <i class="fas fa-tag pl-1"></i>
                                        <p class="m-0 pr-1">Mã giảm 20k</p>
                                    </div>
                                    <div class="flex justify-content-start align-center">
                                        <i class="fas fa-motorcycle pl-1 pr-1"></i>
                                        <p class="m-0 pr-1">Giá 20k</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });

            // create rightList contain all shops by category
            const rightList = document.createElement("div");
            rightList.className = "right__list row m-0";
            // push shopListHtml into rightList HTML

            // push rightList into rightWrapper
            rightWrapper.appendChild(rightList);

            rightList.innerHTML = shopListHtml;
        });

        const shopItems = document.querySelectorAll(".right-item");
        const shopId = [];
        shopItems.forEach((shopItem) => {
            // console.log(shopItem);
            shopItem.onclick = () => {
                const cart = document.querySelector(".cart-container .cart__list");
                shopId.push(Number(shopItem.id));

                const findShopById = shopeeValue.shopValue.filter((items) => {
                    return shopId.some((id) => items.id === id);
                });
                document.querySelector(".qty p").innerText = findShopById.length;
                const getCost = findShopById.reduce((a, b) => {
                    return b.cost + a;
                }, 0);
                const sumCost = formatter.format(`${getCost}`);

                document.querySelector(".btn-search").onclick = () => {
                    document.querySelector(".cart").classList.add("open");
                    const renderCart = findShopById.map((render) => {
                        return `
                        <div class="right-item" id="${render.id}">
                            <a class="" href="#">
                                <img src="${render.img}" alt="">
                                <div>
                                    <div class="right-item__desc">
                                        <p class="m-0"title="${render.shopName}">${render.shopName}
                                        <p class="m-0"title="${render.address}">${render.address}</p>
                                    </div>
                                    <div class="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
                                        <div class="flex justify-content-start pl-1">
                                            <i class="fas fa-tag pr-1 "></i>
                                            <p class="m-0">${render.cost}</p>
                                        </div>
                                        <div class="flex justify-content-start pl-1">
                                            <i class="fas fa-tag pr-1 "></i>
                                            <p class="m-0">${render.cost}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>`;
                    });
                    cart.innerHTML = renderCart.join("");
                    const payment = `<button class="clear-float" type="button">Ok&nbsp;+&nbsp${sumCost}</button>`;
                    document.querySelector(".cart__footer").innerHTML = payment;
                };
            };
        });
        console.log(item.shopValue);
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();

// Promise.all([
//     fetch('http://localhost:3000/categoryJsons'),
//     fetch('http://localhost:3000/shopJsons')
// ])
//     .then(function (responses) {
//         // Get a JSON object from each of the responses
//         return Promise.all(responses.map(function (response) {
//             return response.json();
//         }));
//     })
//     .then(function (data) {
//         return {
//             categories: data[0],
//             shops: data[1]
//         };
//     })
//     .then((value) => {
//         //get all value of shops
//         const getShops = value.shops.map((shopJson) => shopJson);
//         //get category of shop === category id
//         const getCateByShop = value.categories.filter((categoryJson) => {
//             return getShops.some((shop) => {
//                 return shop.category === categoryJson.id;
//             });
//         });
//         return {
//             shopValue: getShops,
//             categoryValue: getCateByShop,
//         }
//     })
//     .then((item) => {
//         const formatter = new Intl.NumberFormat('vi-VI', {
//             style: 'currency',
//             currency: 'VND',
//             minimumFractionDigits: 0
//         })

//         // get category
//         item.categoryValue.map((category) => {

//             const rightContainer = document.querySelector('.content-container-right .container .right');
//             //create section right-wrapper
//             const rightWrapper = document.createElement('section')
//             rightWrapper.className = "right-wrapper"
//             // create div: right__title
//             let rightTitle = document.createElement('div');
//             rightTitle.className = "right__title";
//             // create span in right__title
//             const spanTitle = document.createElement("span")
//             // create tag b in spanTitle
//             const spanTitleB = document.createElement("b")
//             spanTitleB.innerText = `${category.categoryName}`

//             // push tab B into spanTitle
//             spanTitle.appendChild(spanTitleB)
//             // push spanTitle into rightTitle
//             rightTitle.appendChild(spanTitle)
//             // push rightTitle into rightWrapper
//             rightWrapper.appendChild(rightTitle)
//             // push rightWrapper into rightContainer
//             rightContainer.appendChild(rightWrapper)

//             // if category id === shop category
//             const shopByCategory = item.shopValue.filter((shop) => {
//                 return shop.category === category.id;
//             });

//             let shopListHtml = ``;
//             // get each shop by category and renderData

//             shopByCategory.forEach((shop) => {
//                 const cost = formatter.format(`${shop.cost}`)
//                 shopListHtml +=
//                     `
//                     <div class="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4 p-1 blogBox moreBox right-item" id="${shop.id}">
//                         <a class="" href="#">
//                             <img src="${shop.img}" alt="">
//                             <div>
//                                 <div class="right-item__desc">
//                                     <p class="m-0"title="${shop.shopName}">${shop.shopName}
//                                     <p class="m-0"title="${shop.address}">${shop.address}</p>
//                                 </div>
//                                 <div class="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
//                                     <div class="flex justify-content-start pl-1 pr-1">
//                                         <i class="fas fa-tag pr-1 "></i>
//                                         <p class="m-0">${cost}</p>
//                                     </div>
//                                     <div class="flex justify-content-start align-center pl-1 pr-1">
//                                         <i class="fa fa-dollar pr-1"></i>
//                                         <p class="m-0">Giá 40k</p>
//                                     </div>
//                                 </div>
//                                 <div class="row flex justify-content-start flex-nowrap right-item__disc">
//                                     <div class="flex justify-content-start align-center mr-1">
//                                         <i class="fas fa-tag pl-1"></i>
//                                         <p class="m-0 pr-1">Mã giảm 20k</p>
//                                     </div>
//                                     <div class="flex justify-content-start align-center">
//                                         <i class="fas fa-motorcycle pl-1 pr-1"></i>
//                                         <p class="m-0 pr-1">Giá 20k</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </a>
//                     </div>
//                 `
//             });

//             // create rightList contain all shops by category
//             const rightList = document.createElement("div")
//             rightList.className = 'right__list row m-0'
//             // push shopListHtml into rightList HTML

//             // push rightList into rightWrapper
//             rightWrapper.appendChild(rightList)

//             rightList.innerHTML = shopListHtml
//         });

//         const shopItems = document.querySelectorAll('.right-item')
//         const shopId = []
//         shopItems.forEach(shopItem => {
//             // console.log(shopItem);
//             shopItem.onclick = () => {
//                 const cart = document.querySelector('.cart-container .cart__list')
//                 shopId.push(Number(shopItem.id))

//                 const findShopById = item.shopValue.filter(items => {
//                     return shopId.some(id => items.id === id)
//                 })
//                 document.querySelector('.qty p').innerText = findShopById.length
//                 const getCost = findShopById.reduce((a, b) => {
//                     return b.cost + a
//                 }, 0)
//                 const sumCost = formatter.format(`${getCost}`)

//                 document.querySelector('.btn-search').onclick = () => {
//                     document.querySelector('.cart').classList.add('open')
//                     const renderCart = findShopById.map(render => {
//                         return `
//                         <div class="right-item" id="${render.id}">
//                             <a class="" href="#">
//                                 <img src="${render.img}" alt="">
//                                 <div>
//                                     <div class="right-item__desc">
//                                         <p class="m-0"title="${render.shopName}">${render.shopName}
//                                         <p class="m-0"title="${render.address}">${render.address}</p>
//                                     </div>
//                                     <div class="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
//                                         <div class="flex justify-content-start pl-1">
//                                             <i class="fas fa-tag pr-1 "></i>
//                                             <p class="m-0">${render.cost}</p>
//                                         </div>
//                                         <div class="flex justify-content-start pl-1">
//                                             <i class="fas fa-tag pr-1 "></i>
//                                             <p class="m-0">${render.cost}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </a>
//                         </div>`
//                     })
//                     cart.innerHTML = renderCart.join('')
//                     const payment = `<button class="clear-float" type="button">Ok&nbsp;+&nbsp${sumCost}</button>`
//                     document.querySelector('.cart__footer').innerHTML = payment
//                 }
//             }
//         })
//         console.log(item.shopValue);
//         // const shopCategory = ``
//         // item.shopValue.map((value) => {
//         //     shopCategory += `<li>
//         //     <div class="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4 p-1 blogBox moreBox right-item" id="${shop.id}">
//         //                 <a class="" href="#">
//         //                     <img src="${shop.img}" alt="">
//         //                     <div>
//         //                         <div class="right-item__desc">
//         //                             <p class="m-0"title="${shop.shopName}">${shop.shopName}
//         //                             <p class="m-0"title="${shop.address}">${shop.address}</p>
//         //                         </div>
//         //                         <div class="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
//         //                             <div class="flex justify-content-start pl-1 pr-1">
//         //                                 <i class="fas fa-tag pr-1 "></i>
//         //                                 <p class="m-0">${cost}</p>
//         //                             </div>
//         //                             <div class="flex justify-content-start align-center pl-1 pr-1">
//         //                                 <i class="fa fa-dollar pr-1"></i>
//         //                                 <p class="m-0">Giá 40k</p>
//         //                             </div>
//         //                         </div>
//         //                         <div class="row flex justify-content-start flex-nowrap right-item__disc">
//         //                             <div class="flex justify-content-start align-center mr-1">
//         //                                 <i class="fas fa-tag pl-1"></i>
//         //                                 <p class="m-0 pr-1">Mã giảm 20k</p>
//         //                             </div>
//         //                             <div class="flex justify-content-start align-center">
//         //                                 <i class="fas fa-motorcycle pl-1 pr-1"></i>
//         //                                 <p class="m-0 pr-1">Giá 20k</p>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 </a>
//         //             </div>
//         //     </li>`
//         // })
//         // document.querySelector('#pagingBox').innerHTML = shopCategory
//     })

// Payment with Stripe

// https://www.youtube.com/watch?v=1r-F3FIONl8&t
