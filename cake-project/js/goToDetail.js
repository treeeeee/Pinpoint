$(function(){
    var pid=sessionStorage['pid'];
    $.ajax({
        Type:'GET',
        url:'data/detail_reacted.php',
        data:{pid:pid},
        success:function(data){
            var html='';
            for(var i=0;i<data.length;i++){
                html+=`
                <dl>
                    <dt>
                        <img src="img_detail/${data[i].pic_md}">
                    </dt>
                    <dd>
                        <a href="${data[i].pid}" class="goToDetail">${data[i].pname}</a>
                    </dd>
                    <dd>
                    ${data[i].price}/1.0磅
                    </dd>
                </dl>
                `;
            }
            $('.hot-photo').html(html);
            $(".goToDetail").on("click",function(e){
                    e.preventDefault();
                    sessionStorage['pid'] =$(this).attr('href');
                    //在新窗口打开详情页，可打开多个
                    open('detail.html','_blank');
            })
        }
    })
})