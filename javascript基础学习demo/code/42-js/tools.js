// 定义一个定时器的标识
//  var timer;

// 创建一个可以执行简单动画的函数
// 参数：
//        obj   移动对象
//        attr  要执行动画的样式 比如：top left width height
//        target 执行动画的目标位置
//        speed 移动速度
//        callback  回调函数
function move(obj, attr, target, speed, callback) {
    var current = parseInt(getStyle(obj, attr));
    // 当 目标位置 小于 当前位置
    if (target < current) {
        // 便将 速度变成负数
        speed = -speed;
    }
    // 关闭上一个定时器
    clearInterval(obj.timer);
    // 要求是 单击按钮后 box1 向右移动
    obj.timer = setInterval(function () {
        var oldValue = parseInt(getStyle(obj, attr));
        oldValue = oldValue + speed;
        // 移动速度小于零并且当前位置小于目标位置   移动速度大于零并且当前位置大于目标位置
        if ((speed < 0 && oldValue <= target) || (speed > 0 && oldValue >= target)) {
            // 便将 目标位置赋值给当前位置 
            oldValue = target;
        }
        obj.style[attr] = oldValue + 'px';
        if (oldValue == target) {
            clearInterval(obj.timer);
            // 动画执行完毕调用回调函数
            callback && callback();
        }
    }, 30);
}


/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
function getStyle(obj, name) {

    if (window.getComputedStyle) {
        //正常浏览器的方式，具有getComputedStyle()方法
        return getComputedStyle(obj, null)[name];
    } else {
        //IE8的方式，没有getComputedStyle()方法
        return obj.currentStyle[name];
    }

}

// 定义一个函数，用来向一个元素中添加指定的class属性值
/*
    参数：
        obj 要添加class属性的元素
        cn 要添加的class值
*/
function addClass(obj, cn) {

    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

/*
    判断一个元素中是否含有指定的class属性值
        如果有该class 则返回 true 没有则返回false
    
*/
function hasClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    // alert(reg);
    return reg.test(obj.className);
}

/*
    删除一个元素中的指定的class属性
*/
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, '');
}

/*
    toggleClass可以用来切换一个类
    如果元素中具有该类，则删除
    如果元素中没有该类，则添加
*/
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        // 有 删除
        removeClass(obj, cn);
    } else {
        // 没有 添加
        addClass(obj, cn);
    }
}