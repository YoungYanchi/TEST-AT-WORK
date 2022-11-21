//
// let database = "https://62bc79866b1401736cfb7cf4.mockapi.io/items";
//
// $.getJSON( database, function( json ) {
//     console.log( "JSON Data: " + json.users[ 3 ].name );
// });

$.ajax({
    type: 'GET',
    url: 'https://62bc79866b1401736cfb7cf4.mockapi.io/items',
    data: {get_param: 'value'},
    dataType: 'text',
    success: function (data) {
        let items = $.parseJSON(data)
        items.map(item =>
            $('.catalog').append(`
             <div class="catalog__product-card">
             <div class="catalog__product-card__img">
             ${item.img === undefined ? ("<img src='images/default.svg' alt='default'/>") : ("<img src=" + item.img + " alt='product_img'/>")}
             </div>
             
             <div class="catalog__product-card__description">
             <h2 class="catalog__product-card_description_title">${item.description.title}</h2>
             <p class="catalog__product-card_description_price">${item.description.price}</p>
             <p class="catalog__product-card_description_date">Осталось ${item.description.date} дней</p>
             ${item.description.company === undefined ? ("<p class='catalog__product-card_description_place'>" + item.description.place + "</p>") : (
                    // Нужно сделать див
                    "<p class='catalog__product-card_description_company_place'>" + item.description.company.name + "</p> " +
                    "<p class='catalog__product-card_description_company_'> " + item.description.company.place + "</p> "

                )}
             ${item.description.visibility === undefined ? "<div></div>" : (
                    "<p class='catalog__product-card_description_visibility'>Видимость: " + item.description.visibility + "</p>"
                )}
             ${item.description.task_type === undefined ? "<div></div>" : (
                    "<p class='catalog__product-card_description_tasks-type'>Тип задания: " + item.description.task_type + "</p>"
                )}
           ${item.description.post_type === undefined ? "<div></div>" : (
                    "<p class='catalog__product-card_description_tasks-type'>Тип публикации: " + item.description.post_type + "</p>"
                )}
             </div>
             
             <div class="catalog__product-card__dashboard">
                ${item.dashboard.resp === undefined ? "<div class='catalog__product-card__dashboard_hide'></div>" : (
                    "<div class='catalog__product-card__dashboard_responses'>Откилики " + item.dashboard.resp.oldres + "" +
                    " + " + item.dashboard.resp.new +"</div>"
                )}
                <div class='catalog__product-card__dashboard_views'>${item.dashboard.views} просмотров</div>
                
                ${item.dashboard.favorites === undefined ? "<div class='catalog__product-card__dashboard_hide'></div>" : (
                    "<div class='catalog__product-card__dashboard_favorites'>В Избранном " + item.dashboard.favorites + "</div>")}
                
                 ${item.dashboard.fit === undefined ? "<div class='catalog__product-card__dashboard_hide'></div>" : (
                    "<div class='catalog__product-card__dashboard_fit'>Подходят " + item.dashboard.fit + " </div>"
                )}
                 ${item.dashboard.offers === undefined ? "<div class='catalog__product-card__dashboard_hide'></div>" : (
                    "<div class='catalog__product-card__dashboard_offers'>Предложения " + item.dashboard.offers + "</div>")}
                 
                 ${item.dashboard.invites === undefined ? "<div class='catalog__product-card__dashboard_hide'></div>" : (
                    "<div class='catalog__product-card__dashboard_invites'>Приглашены " + item.dashboard.invites + "</div>")}
                 
                ${item.dashboard.progress === undefined ? "<div class='catalog__product-card__dashboard_hide'></div>" : (
                    "<div class='catalog__product-card__dashboard_progress'> " + item.dashboard.progress + "</div>")}
</div>
             
             
             <div class="catalog__product-card__menu">
                <img src="/images/arrowbtn.svg" alt="img">
                <img src="/images/penbtn.svg" alt="img">
                <img src="/images/downloadbtn.svg" alt="img">
                <img src="/images/anotherbtn.svg" alt="img">
                <div/>
             
             
             
             
            </div>`
            )
        )
    }
});

let dropdowns = $(".catalog__filter__sort");

// Onclick on a dropdown, toggle visibility
dropdowns.find("dt").click(function () {
    dropdowns.find("dd ul").hide();
    $(this).next().children().toggle();
});

// Clic handler for dropdown
dropdowns.find("dd ul li a").click(function () {
    let leSpan = $(this).parents(".catalog__filter__sort").find("dt a span");

    // Remove selected class
    $(this).parents(".catalog__filter__sort").find('dd a').each(function () {
        $(this).removeClass('selected');
    });

    // Update selected value
    leSpan.html($(this).html());

    // If back to default, remove selected class else addclass on right element
    if ($(this).hasClass('default')) {
        leSpan.removeClass('selected')
    } else {
        leSpan.addClass('selected');
        $(this).addClass('selected');
    }

    // Close dropdown
    $(this).parents("ul").hide();
});

// Close all dropdown onclick on another element
$(document).bind('click', function (e) {
    if (!$(e.target).parents().hasClass("catalog__filter__sort")) $(".catalog__filter__sort dd ul").hide();
});

// <div className="catalog__product-card__dashboard">
//     <div className='catalog__product-card__dashboard_response'>Откилики ${item.dashboard.responses.old} +
//         ${item.dashboard.responses.new}</div>
//     <div className='catalog__product-card__dashboard_views'>${item.dashboard.views} просмотров</div>
//     <div className='catalog__product-card__dashboard_favorites'>В Избранном ${item.dashboard.favorites}</div>
//     <div className='catalog__product-card__dashboard_fit'>Подходят ${item.dashboard.fit} </div>
//     <div className='catalog__product-card__dashboard_progress'> ${item.dashboard.progress}</div>
// </div>