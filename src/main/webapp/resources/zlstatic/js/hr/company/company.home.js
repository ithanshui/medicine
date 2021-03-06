function check_img(obj, action_url, companyId, id) {
    var logo = obj.value;
    this.AllowExt = ".jpg,.gif,.jpeg,.png,.pjpeg", this.FileExt = logo.substr(logo.lastIndexOf(".")).toLowerCase(), 0 != this.AllowExt && -1 == this.AllowExt.indexOf(this.FileExt) ? errorTips("只支持jpg、gif、png、jpeg格式，请重新上传") : $.ajaxFileUpload({
        url: action_url,
        secureuri: !1,
        fileElementId: id,
        data: {
            companyId: companyId,
            logo: logo
        },
        dataType: "text",
        success: function (jsonStr) {
            var result = eval("(" + jsonStr + ")");
            result.success ? ($("#logoShow img").attr("src", ctx + "/" + result.content), $("#logoNo").hide(), $("#logoShow").show()) : $("#logo_error").text(result.msg).show()
        }
    })
}

function check_product(a, b, c, d, e, f) {
    var g = $(a).parents(".new_product");
    this.AllowExt = ".jpg,.jpeg,.gif,.png,.pjpeg", this.FileExt = a.value.substr(a.value.lastIndexOf(".")).toLowerCase(), 0 != this.AllowExt && -1 == this.AllowExt.indexOf(this.FileExt) ? errorTips("只支持jpg、jpeg、gif、png格式，请重新上传") : $.ajaxFileUpload({
        url: b,
        secureuri: !1,
        fileElementId: a.id,
        data: {
            type: 3
        },
        dataType: "text",
        success: function (a) {
            "" != a ? ($("." + f, g).val(a), $("." + d + " img", g).attr("src", ctx + "/" + a), $("." + c, g).hide(), $("." + d, g).show()) : $(".errorTips").click(function () {
                errorTips("上传失败，请重新上传")
            })
        }
    })
}

function check_member(a, b, c, d, e, f) {
    var g = $(a).parents(".new_portrait");
    this.AllowExt = ".jpg,.jpeg,.gif,.png,.pjpeg", this.FileExt = a.value.substr(a.value.lastIndexOf(".")).toLowerCase(), 0 != this.AllowExt && -1 == this.AllowExt.indexOf(this.FileExt) ? errorTips("只支持jpg、jpeg、gif、png格式，请重新上传") : $.ajaxFileUpload({
        url: b,
        secureuri: !1,
        fileElementId: a.id,
        data: {
            type: 7
        },
        dataType: "text",
        success: function (a) {
            "" != a ? ($("." + f, g).val(a), $("." + d + " img", g).attr("src", ctx + "/" + a), $("." + c, g).hide(), $("." + d, g).show()) : $(".errorTips").click(function () {
                errorTips("上传失败，请重新上传")
            })
        }
    })
}
$(function () {
    var a, b, c, d;
    $(".tipExpire .expire_close").bind("click", function () {
        var a = $.cookie("showExpriedCompanyHome");
        $.cookie("showExpriedCompanyHome", a - 1), $(this).parent(".tipExpire").hide()
    }), a = $("#hasLabels").html(), $("#cancelLabels").click(function () {
        $("#label").val(""), $("#addLabels").hide(), $(".c_box h3").hide(), $("#hasLabels li").each(function () {
            $(this).find("i").remove()
        }), $("#hasLabels").on("mouseenter", "li", function () {
            $(this).css({
                marginRight: "18px",
                cursor: "default"
            })
        }), $("#hasLabels").append('<li class="link">编辑</li>'), $("#hasLabels").empty().append(a), $(this).parents(".c_detail").removeClass("c_detail_bg")
    }), $("#saveLabels").click(function () {
        var d, b = [],
            c = $(this);
        $("#hasLabels li").each(function () {
            b.push($(this).children("span").text())
        }), d = $("#companyId").val(), $.ajax({
            type: "POST",
            data: {
                companyId: d,
                labels: b.join()
            },
            url: ctx + "/companyLabel/pasteLabelToCompany.json"
        }).done(function (b) {
            b.success ? ($("#addLabels").hide(), $(".c_box h3").hide(), $("#hasLabels li").each(function () {
                $(this).find("i").remove()
            }), $("#hasLabels").on("mouseenter", "li", function () {
                $(this).css({
                    marginRight: "18px",
                    cursor: "default"
                })
            }), $("#hasLabels").append('<li class="link">编辑</li>'), a = $("#hasLabels").html(), c.parents(".c_detail").removeClass("c_detail_bg")) : alert("保存失败")
        })
    }), $("#hasLabels").on("click", ".link", function () {
        if (navigator.userAgent.indexOf("MSIE") > 0 && (navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 9.0") > 0)) {
            var a = $("#label").attr("placeholder");
            $("#label").val(a).css("color", "#777777")
        }
        $("#changeLabels").trigger("click"), $(".c_detail").addClass("c_detail_bg"), $("#addLabels").show(), $(".c_box h3").show(), $(this).remove(), $("#hasLabels li").each(function () {
            $(this).append("<i>x</i>")
        }), $("#hasLabels").on("mouseenter", "li", function () {
            $(this).css({
                marginRight: "6px",
                cursor: "pointer"
            })
        }), $("#hasLabels").on("mouseleave", "li", function () {
            $(this).css({
                marginRight: "18px",
                cursor: "pointer"
            })
        })
    }), $("#hasLabels").on("click", "li i", function () {
        $(this).parent().remove()
    }), $("#addLabels ul").on("click", "li", function () {
        var a, b;
        $(this).hasClass("curr") || ($(this).addClass("curr"), a = $(this).text(), b = !0, $("#hasLabels li").each(function () {
            $(this).children("span").text() == a && (alert("此标签已存在，请重新输入"), b = !1)
        }), b && $("#hasLabels").append("<li><span>" + a + "</span><i>x</i></li>"))
    }), $("#add_label").bind("click", function () {
        var a = $("#label"),
            b = $.trim(a.val()),
            c = !0;
        b.length <= 6 && b.length > 0 ? ($("#hasLabels li").each(function () {
            $("span", this).text() == b && (c = !1)
        }), c ? $("#hasLabels").append("<li><span>" + b + "</span><i>x</i></li>") : alert("此标签已存在，请重新输入"), a.val("")) : alert("请输入1-6字的自定义标签")
    }), $("#label").keydown(function (a) {
        13 == a.which && $("#add_label").trigger("click")
    }), b = 1, $("#changeLabels").click(function () {
        $.ajax({
            type: "POST",
            url: ctx + "/companyLabel/changeLabels.json",
            data: {
                pageNo: b,
                pageSize: 12
            }
        }).done(function (a) {
            var b, c;
            if ("" != a) {
                b = "";
                for (c in a.content) b += "<li>" + a.content[c] + "</li>";
                $("#addLabels ul").html(b)
            } else alert("保存失败")
        }), b++
    }), $(".scroll-pane").jScrollPane(), $("#Member").on("click", ".c_add", function () {
        if ($("#Member .member_wrap").length < 3) {
            var a = $(this).parents("#Member").find(".member_wrap").first().clone();
            $(".member_info:nth-child(1)", a).addClass("dn"), $(".member_info:nth-child(2) input[type!='submit'],.member_info:nth-child(2) textarea", a).val(""), $(".member_info:nth-child(2) .word_count", a).children("span").text(500), $(".member_info:nth-child(2) img", a).attr("src", ""), $(".member_info:nth-child(2) .portraitShow", a).hide(), $(".member_info:nth-child(2) .portraitNo", a).show(), $(".member_info:nth-child(2)", a).removeClass("dn"), $(".member_info:nth-child(3)", a).addClass("dn"), $(a).appendTo("#Member dd"), $("#Member .member_wrap").each(function (a) {
                $(this).find("input[type='file']").attr("id", "profiles" + a)
            })
        }
        $("#Member .member_wrap").length >= 3 && $("#Member .c_add").hide(), $(".memberForm", a).validate({
            onkeyup: !1,
            focusCleanup: !0,
            onfocusout: !1,
            onsubmit: !0,
            rules: {
                myfiles: {
                    required: !1
                },
                name: {
                    required: !1
                },
                position: {
                    required: !1
                },
                weibo: {
                    required: !1,
                    checkUrlNot: !0,
                    maxlength: 80
                },
                remark: {
                    required: !1,
                    minlength: 10,
                    maxlength: 500
                }
            },
            messages: {
                weibo: {
                    checkUrlNot: "请输入真实的新浪微博地址",
                    maxlength: "请输入80字符以内的网址"
                },
                remark: {
                    minlength: "请输入10-500字的个人简介",
                    maxlength: "请输入10-500字的个人简介"
                }
            },
            submitHandler: function (b) {
                var i, j, c = $("#companyId").val(),
                    d = $(".leader_id", b).val(),
                    e = $(".leaderInfos", b).val(),
                    f = "请输入创始人姓名" != $('input[name="name"]', b).val() ? $('input[name="name"]', b).val() : "",
                    g = "请输入创始人当前职位" != $('input[name="position"]', b).val() ? $('input[name="position"]', b).val() : "",
                    h = "请输入创始人新浪微博地址" != $.trim($('input[name="weibo"]', b).val()) ? $.trim($('input[name="weibo"]', b).val()) : "";
                "" != h && "http://" != h.substring(0, 7) && (h = "http://" + h), i = "请输入创始人个人简介" != $('textarea[name="remark"]', b).val() ? $('textarea[name="remark"]', b).val() : "", j = $("#resubmitToken").val(), a = $(b).parents(".member_wrap"), $(b).find(":submit").attr("disabled", !0), $.ajax({
                    type: "POST",
                    url: ctx + "/cl/saveLeaderInfo.json",
                    data: {
                        companyId: c,
                        id: d,
                        photo: e,
                        name: f,
                        position: g,
                        weibo: h,
                        remark: i,
                        resubmitToken: j
                    },
                    dataType: "json"
                }).success(function (c) {
                    $("#resubmitToken").val(c.resubmitToken), c.success ? ($(".member_info:nth-child(1)", a).addClass("dn"), $(".member_info:nth-child(2)", a).addClass("dn"), $(".member_info:nth-child(2) .leader_id", a).val(c.content.id), $(".member_info:nth-child(3) img", a).attr("src", ctx + "/" + c.content.photo), "" != c.content.weibo ? $(".member_info:nth-child(3) .m_name", a).html(c.content.name + '<a href="' + c.content.weibo + '" class="weibo" target="_blank"></a>') : $(".member_info:nth-child(3) .m_name", a).html(c.content.name), $(".member_info:nth-child(3) .m_position", a).html(c.content.position), $(".member_info:nth-child(3) .m_intro", a).html(c.content.remark), $(".member_info:nth-child(3)", a).removeClass("dn"), $("#Member .member_wrap").length >= 3 ? $("#Member .c_add").hide() : $("#Member .c_add").show()) : 1 == $(".member_wrap").length ? ($(".member_info:nth-child(1)", a).removeClass("dn"), $(".member_info:nth-child(2)", a).addClass("dn"), $(".member_info:nth-child(2) input[type!='submit'], .member_info:nth-child(2) textarea", a).val(""), $(".member_info:nth-child(3)", a).addClass("dn"), $("#Member .c_add").hide()) : ($(a).remove(), $("#Member .c_add").show()), $(b).find(":submit").attr("disabled", !1)
                })
            }
        })
    }), $("#Member").on("click", ".member_edit", function () {
        var a, b;
        $(".newMember .memberForm span.error").hide(), a = $(this).parents(".member_wrap"), b = $(".member_info:nth-child(3) .m_intro", a).html(), b && (b = $.trim(b.replace(/<br>/gi, ""))), $(".member_info:nth-child(2) textarea", a).val(b), $(".member_info:nth-child(2) .word_count", a).children("span").text(500 - $(".member_info:nth-child(2) textarea", a).val().length), $(".member_info:nth-child(2)", a).removeClass("dn"), $(".member_info:nth-child(1)", a).addClass("dn"), $(".member_info:nth-child(3)", a).addClass("dn")
    }), $("#Member").on("click", ".member_delete", function () {
        var a, b;
        confirm("确定要删除该创始人吗？") && (a = $(this).next().val(), b = $(this).parents(".member_wrap"), "" == a ? $("#Member .member_wrap").length <= 1 ? ($(".member_info:nth-child(1)", b).removeClass("dn"), $(".member_info:nth-child(2)", b).addClass("dn"), $(".member_info:nth-child(2) input[type!='submit'], .member_info:nth-child(2) textarea", b).val(""), $(".member_info:nth-child(2) img", b).attr("src", ""), $(".member_info:nth-child(2) .portraitShow", b).hide(), $(".member_info:nth-child(2) .portraitNo", b).show(), $(".member_info:nth-child(3)", b).addClass("dn"), $("#Member .c_add").hide()) : ($(b).remove(), $("#Member .c_add").show()) : $.ajax({
            type: "POST",
            url: ctx + "/cl/delLeaderInfo.json",
            data: {
                leaderId: a
            },
            dataType: "json"
        }).success(function () {
            $("#Member .member_wrap").length <= 1 ? ($(".member_info:nth-child(1)", b).removeClass("dn"), $(".member_info:nth-child(2)", b).addClass("dn"), $(".member_info:nth-child(2) input[type!='submit'], .member_info:nth-child(2) textarea", b).val(""), $(".member_info:nth-child(2) img", b).attr("src", ""), $(".member_info:nth-child(2) .portraitShow", b).hide(), $(".member_info:nth-child(2) .portraitNo", b).show(), $(".member_info:nth-child(3)", b).addClass("dn"), $("#Member .c_add").hide()) : ($(b).remove(), $("#Member .c_add").show()), $("#Member .member_wrap").each(function (a) {
                $(this).find("input[type='file']").attr("id", "profiles" + a)
            })
        }))
    }), $("#Member .memberForm").on("keyup", ".s_textarea", function () {
        var a = $(this),
            b = $.trim(a.val()).length;
        b > 500 ? a.val(a.val().substring(0, 500)) : $(this).siblings("span").length > 0 && (b > 10 || 10 == b) ? $(this).siblings("span").hide() : $(this).siblings("span").length > 0 && 10 > b ? $(this).siblings("span").show() : a.next(".word_count").children("span").text(500 - b)
    }), $(".memberForm").each(function () {
        $(this).validate({
            onkeyup: !1,
            rules: {
                myfiles: {
                    required: !1
                },
                name: {
                    required: !1
                },
                position: {
                    required: !1
                },
                weibo: {
                    required: !1,
                    checkUrlNot: !0,
                    maxlength: 80
                },
                remark: {
                    required: !1,
                    minlength: 10,
                    maxlength: 500
                }
            },
            messages: {
                weibo: {
                    checkUrlNot: "请输入真实的新浪微博地址",
                    maxlength: "请输入80字符以内的网址"
                },
                remark: {
                    minlength: "请输入10-500字的个人简介",
                    maxlength: "请输入10-500字的个人简介"
                }
            },
            submitHandler: function (a) {
                var h, i, j, b = $("#companyId").val(),
                    c = $(".leader_id", a).val(),
                    d = $(".leaderInfos", a).val(),
                    e = "请输入创始人姓名" != $('input[name="name"]', a).val() ? $('input[name="name"]', a).val() : "",
                    f = "请输入创始人当前职位" != $('input[name="position"]', a).val() ? $('input[name="position"]', a).val() : "",
                    g = "请输入创始人新浪微博地址" != $.trim($('input[name="weibo"]', a).val()) ? $.trim($('input[name="weibo"]', a).val()) : "";
                "" != g && "http://" != g.substring(0, 7) && (g = "http://" + g), h = "请输入创始人个人简介" != $('textarea[name="remark"]', a).val() ? $('textarea[name="remark"]', a).val() : "", i = $(a).parents(".member_wrap"), j = $("#resubmitToken").val(), $(a).find(":submit").attr("disabled", !0), $.ajax({
                    type: "POST",
                    url: ctx + "/cl/saveLeaderInfo.json",
                    data: {
                        companyId: b,
                        id: c,
                        photo: d,
                        name: e,
                        position: f,
                        weibo: g,
                        remark: h,
                        resubmitToken: j
                    },
                    dataType: "json"
                }).success(function (b) {
                    $("#resubmitToken").val(b.resubmitToken), b.success ? ($(".member_info:nth-child(1)", i).addClass("dn"), $(".member_info:nth-child(2)", i).addClass("dn"), $(".member_info:nth-child(2) .leader_id", i).val(b.content.id), $(".member_info:nth-child(3) img", i).attr("src", ctx + "/" + b.content.photo), "" != b.content.weibo ? $(".member_info:nth-child(3) .m_name", i).html(b.content.name + '<a href="' + b.content.weibo + '" class="weibo" target="_blank"></a>') : $(".member_info:nth-child(3) .m_name", i).html(b.content.name), $(".member_info:nth-child(3) .m_position", i).html(b.content.position), $(".member_info:nth-child(3) .m_intro", i).html(b.content.remark), $(".member_info:nth-child(3)", i).removeClass("dn"), $("#Member .member_wrap").length >= 3 ? $("#Member .c_add").hide() : $("#Member .c_add").show()) : 1 == $(".member_wrap").length ? ($(".member_info:nth-child(1)", i).removeClass("dn"), $(".member_info:nth-child(2)", i).addClass("dn"), $(".member_info:nth-child(2) input[type!='submit'], .member_info:nth-child(2) textarea", i).val(""), $(".member_info:nth-child(3)", i).addClass("dn"), $("#Member .c_add").hide()) : ($(i).remove(), $("#Member .c_add").show()), $(a).find(":submit").attr("disabled", !1)
                })
            }
        })
    }), $("#Product").on("click", ".product_add", function () {
        if ($("#Product .product_wrap").length < 3) {
            var a = $(this).parents(".product_wrap").clone();
            $("dl:nth-child(1)", a).addClass("dn"), $("dl:nth-child(2) input[type!='submit'],dl:nth-child(2) textarea", a).val(""), $("dl:nth-child(2) .word_count", a).children("span").text(500), $("dl:nth-child(2) .productShow img", a).attr("src", ""), $("dl:nth-child(2) .productShow", a).hide(), $("dl:nth-child(2) .productNo", a).show(), $("dl:nth-child(2)", a).removeClass("dn"), $("dl:nth-child(3)", a).addClass("dn"), $(a).appendTo("#Product"), $("#Product .product_wrap").each(function (a) {
                $("input[type='file']", this).attr("id", "myfiles" + a)
            })
        }
        $("#Product .product_wrap").length >= 3 && $(".product_add").addClass("dn"), $(".productForm", a).validate({
            onkeyup: !1,
            onfocusout: !1,
            onsubmit: !0,
            rules: {
                myfiles: {
                    required: !1
                },
                product: {
                    required: !1,
                    maxlength: 20
                },
                productUrl: {
                    required: !1,
                    checkUrlNot: !0,
                    maxlength: 80
                },
                productProfile: {
                    required: !1,
                    minlength: 10,
                    maxlength: 500
                }
            },
            messages: {
                product: {
                    maxlength: "请输入20字符以内的产品名称"
                },
                productUrl: {
                    checkUrlNot: "请输入有效的产品主页或产品下载地址",
                    maxlength: "请输入80字符以内的网址"
                },
                productProfile: {
                    minlength: "请输入10-500字的产品简介",
                    maxlength: "请输入10-500字的产品简介"
                }
            },
            submitHandler: function (b) {
                var h, i, c = $("#companyId").val(),
                    d = $(".product_id", b).val(),
                    e = $(".productInfos", b).val(),
                    f = "请输入产品名称" != $('input[name="product"]', b).val() ? $('input[name="product"]', b).val() : "",
                    g = "请输入产品网址" != $.trim($('input[name="productUrl"]', b).val()) ? $.trim($('input[name="productUrl"]', b).val()) : "";
                "" != g && "http://" != g.substring(0, 7) && (g = "http://" + g), h = "请简短描述该产品定位、产品特色、用户群体等" != $('textarea[name="productProfile"]', b).val() ? $('textarea[name="productProfile"]', b).val() : "", i = $("#resubmitToken").val(), a = $(b).parents(".product_wrap"), $(b).find(":submit").attr("disabled", !0), $.ajax({
                    type: "POST",
                    url: ctx + "/cp/saveCompanyProduct.json",
                    data: {
                        companyId: c,
                        id: d,
                        type: 1,
                        productPicUrl: e,
                        product: f,
                        productUrl: g,
                        productProfile: h,
                        resubmitToken: i
                    },
                    dataType: "json"
                }).success(function (c) {
                    $("#resubmitToken").val(c.resubmitToken), c.success ? ($("dl:nth-child(1)", a).addClass("dn"), $("dl:nth-child(2)", a).addClass("dn"), $("dl:nth-child(2) .product_id", a).val(c.content.id), $("dl:nth-child(3) img", a).attr("src", ctx + "/" + c.content.productPicUrl), $("dl:nth-child(3) .cp_intro a", a).attr("href", c.content.productUrl), $("dl:nth-child(3) .cp_intro a", a).html(c.content.product), $("dl:nth-child(3) .jspPane > div", a).html(c.content.productProfile), $("dl:nth-child(2) textarea", a).text(c.content.productProfile), $("dl:nth-child(3)", a).removeClass("dn"), $(".scroll-pane").jScrollPane()) : 1 == $(".product_wrap").length ? ($("dl:nth-child(1)", a).removeClass("dn"), $("dl:nth-child(2)", a).addClass("dn"), $("dl:nth-child(2) input[type!='submit'], dl:nth-child(2) textarea", a).val(""), $("dl:nth-child(2) textarea", a).text(""), $("dl:nth-child(3)", a).addClass("dn")) : ($(".product_add").removeClass("dn"), $(a).remove()), $(b).find(":submit").attr("disabled", !1)
                })
            }
        })
    }), $("#Product").on("click", ".product_edit", function () {
        var a, b;
        $(".newProduct .productForm span.error").hide(), a = $(this).parents(".product_wrap"), b = $("dl:nth-child(2) textarea", a).text(), b && (b = $.trim(b.replace(/<br \/>/gi, ""))), $("dl:nth-child(2) .word_count", a).children("span").text(500 - $("dl:nth-child(2) textarea", a).val().length), $("dl:nth-child(2)", a).removeClass("dn"), $("dl:nth-child(1)", a).addClass("dn"), $("dl:nth-child(3)", a).addClass("dn")
    }), $("#Product").on("click", ".product_delete", function () {
        var a, b;
        confirm("确定要删除该条产品信息吗？") && (a = $(this).next().val(), b = $(this).parents(".product_wrap"), "" == a ? $("#Product .product_wrap").length <= 1 ? ($("dl:nth-child(2) input[type!='submit']").val(), $("dl:nth-child(1)", b).removeClass("dn"), $("dl:nth-child(2)", b).addClass("dn"), $("dl:nth-child(2) input[type!='submit'], dl:nth-child(2) textarea", b).val(""), $("dl:nth-child(3)", b).addClass("dn")) : $(b).remove() : $.ajax({
            type: "POST",
            url: ctx + "/cp/delProductInfo.json",
            data: {
                productId: a
            },
            dataType: "json"
        }).success(function () {
            $("#Product .product_wrap").length <= 1 ? ($("dl:nth-child(1)", b).removeClass("dn"), $("dl:nth-child(2)", b).addClass("dn"), $("dl:nth-child(2) input[type!='submit'], dl:nth-child(2) textarea", b).val(""), $("dl:nth-child(2) textarea", b).text(""), $("dl:nth-child(2) .productShow img", b).attr("src", ""), $("dl:nth-child(2) .productShow", b).hide(), $("dl:nth-child(2) .productNo", b).show(), $("dl:nth-child(3)", b).addClass("dn")) : $(b).remove()
        }), $(".product_add").removeClass("dn"), $("#Product .product_wrap").each(function (a) {
            $("input[type='file']", this).attr("id", "myfiles" + a)
        }))
    }), $("#Product .productForm").on("keyup", ".s_textarea", function () {
        var a = $(this),
            b = $.trim(a.val()).length;
        b > 500 ? a.val(a.val().substring(0, 500)) : $(this).siblings("span").length > 0 && (b > 10 || 10 == b) ? $(this).siblings("span").hide() : $(this).siblings("span").length > 0 && 10 > b ? $(this).siblings("span").show() : a.next(".word_count").children("span").text(500 - b)
    }), $(".productForm").each(function () {
        $(this).validate({
            onkeyup: !1,
            rules: {
                myfiles: {
                    required: !1
                },
                product: {
                    required: !1,
                    maxlength: 20
                },
                productUrl: {
                    required: !1,
                    checkUrlNot: !0,
                    maxlength: 80
                },
                productProfile: {
                    required: !1,
                    minlength: 10,
                    maxlength: 500
                }
            },
            messages: {
                product: {
                    maxlength: "请输入20字符以内的产品名称"
                },
                productUrl: {
                    checkUrlNot: "请输入有效的产品主页或产品下载地址",
                    maxlength: "请输入80字符以内的网址"
                },
                productProfile: {
                    minlength: "请输入10-500字的产品简介",
                    maxlength: "请输入10-500字的产品简介"
                }
            },
            submitHandler: function (a) {
                var g, h, i, b = $("#companyId").val(),
                    c = $(".product_id", a).val(),
                    d = $(".productInfos", a).val(),
                    e = "请输入产品名称" != $('input[name="product"]', a).val() ? $('input[name="product"]', a).val() : "",
                    f = "请输入产品网址" != $.trim($('input[name="productUrl"]', a).val()) ? $.trim($('input[name="productUrl"]', a).val()) : "";
                "" != f && "http://" != f.substring(0, 7) && (f = "http://" + f), g = "请分段详细描述公司简介、企业文化等" != $('textarea[name="productProfile"]', a).val() ? $('textarea[name="productProfile"]', a).val() : "", h = $("#resubmitToken").val(), i = $(a).parents(".product_wrap"), $(a).find(":submit").attr("disabled", !0), $.ajax({
                    type: "POST",
                    url: ctx + "/cp/saveCompanyProduct.json",
                    data: {
                        companyId: b,
                        id: c,
                        type: 1,
                        productPicUrl: d,
                        product: e,
                        productUrl: f,
                        productProfile: g,
                        resubmitToken: h
                    },
                    dataType: "json"
                }).success(function (b) {
                    $("#resubmitToken").val(b.resubmitToken), b.success ? ($("dl:nth-child(1)", i).addClass("dn"), $("dl:nth-child(2)", i).addClass("dn"), $("dl:nth-child(2) .product_id", i).val(b.content.id), $("dl:nth-child(3) img", i).attr("src", ctx + "/" + b.content.productPicUrl), $("dl:nth-child(3) .cp_intro a", i).attr("href", b.content.productUrl), $("dl:nth-child(3) .cp_intro a", i).html(b.content.product), $("dl:nth-child(3) .jspPane > div", i).html(b.content.productProfile), $("dl:nth-child(2) textarea", i).text(b.content.productProfile), $("dl:nth-child(3)", i).removeClass("dn"), $(".scroll-pane").jScrollPane()) : 1 == $(".product_wrap").length ? ($("dl:nth-child(1)", i).removeClass("dn"), $("dl:nth-child(2)", i).addClass("dn"), $("dl:nth-child(2) input[type!='submit'], dl:nth-child(2) textarea", i).val(""), $("dl:nth-child(2) textarea", i).text(""), $("dl:nth-child(3)", i).addClass("dn")) : $(i).remove(), $(a).find(":submit").attr("disabled", !1)
                })
            }
        })
    }), $("#editCompanyDetail").click(function () {
        $(this).hide(), $(".c_detail").addClass("c_detail_bg"), $(".c_box .oneword").hide(), $(".editDetail").show()
    }), $("#cancelDetail").click(function () {
        $("#editCompanyDetail").show(), $(".c_box .oneword").show(), $(".editDetail").hide(), "none" == $("#addLabels").css("display") && $(".c_detail").removeClass("c_detail_bg")
    }), $("#editDetailForm").validate({
        onkeyup: !1,
        rules: {
            companyShortName: {
                required: !1
            },
            companyFeatures: {
                required: !0,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            companyFeatures: {
                required: "请输入5-50字的一句话介绍",
                minlength: "请输入5-50字的一句话介绍",
                maxlength: "请输入5-50字的一句话介绍"
            }
        },
        submitHandler: function (a) {
            var b = $("#companyId").val(),
                c = $("#companyFeatures").val() != $("#companyFeatures").attr("placeholder") ? $("#companyFeatures").val() : "",
                d = $("#companyShortName").val() != $("#companyShortName").attr("placeholder") ? $("#companyShortName").val() : "";
            $(a).find(":submit").attr("disabled", !0), $.ajax({
                type: "POST",
                url: ctx + "/cd/saveProfileShortNameAndFeatures.json",
                data: {
                    companyId: b,
                    companyShortName: d,
                    companyFeatures: c
                },
                dataType: "json"
            }).success(function (b) {
                b.success ? ("" != b.content.companyShortName ? ($(".c_box h2").text(b.content.companyShortName), $(".c_box h2").attr("title", b.content.companyShortName), $(".c_box h1.fullname").show()) : ($(".c_box h2").text($(".c_box h1.fullname").text()), $(".c_box h2").attr("title", $(".c_box h1.fullname").attr("title")), $(".c_box h1.fullname").hide()), $(".oneword span").text(b.content.companyFeatures), "none" == $("#addLabels").css("display") ? ($(".editDetail").hide(), $("#editCompanyDetail").show(), $(".c_detail").removeClass("c_detail_bg"), $(".c_box .oneword").show()) : ($(".editDetail").hide(), $("#editCompanyDetail").show(), $(".c_box .oneword").show())) : $("#beError").text(b.msg).show(), $(a).find(":submit").attr("disabled", !1)
            })
        }
    }), $(".newIntro #companyProfile").bind("keyup", function () {
        (1e3 - $(".newIntro .word_count ").find("span").html() > 20 || 20 == 1e3 - $(".newIntro .word_count ").find("span").html()) && $(".newIntro span.error").hide()
    }), $("#Profile").on("click", "#editIntro,#addIntro", function () {
        var a, b;
        $(".newIntro #companyDesForm span.error").hide(), a = $(this).parents(".profile_wrap"), b = $("dl:nth-child(3) .c_intro", a).html(), b && (b = $.trim(b.replace(/<br>/gi, ""))), $("dl:nth-child(2) textarea", a).val(b), $("dl:nth-child(2) .word_count", a).children("span").text(1e3 - $.trim($("dl:nth-child(2) textarea", a).val()).length), $("dl:nth-child(1)", a).hide(), $("dl:nth-child(2)", a).show(), $("dl:nth-child(3)", a).hide()
    }), $("#companyDesForm").submit(function () {
        $("textarea", this).val() == $("textarea", this).attr("placeholder") && $("textarea", this).val("")
    }).validate({
        onkeyup: !1,
        onfocusout: !1,
        onsubmit: !0,
        rules: {
            companyProfile: {
                required: !1,
                rangeLen: [20, 1e3]
            }
        },
        messages: {
            companyProfile: {
                rangeLen: "请输入20-1000字的公司介绍"
            }
        },
        submitHandler: function (a) {
            var b = $("#companyId").val(),
                c = $.trim($("#companyProfile").val()) != $("#companyProfile").attr("placeholder") ? $.trim($("#companyProfile").val()) : "",
                d = $(a).parents(".profile_wrap");
            $(a).find(":submit").attr("disabled", !0), $.ajax({
                type: "POST",
                url: ctx + "/c/saveCompanyProfile.json",
                data: {
                    companyId: b,
                    companyProfile: c
                },
                dataType: "json"
            }).success(function (b) {
                if (b.success)
                    if ("" == b.content) $("dl:nth-child(1)", d).show(), $("dl:nth-child(2) textarea", d).val(""), $("dl:nth-child(2)", d).hide(), $("dl:nth-child(3) .c_intro", d).html(""), $("dl:nth-child(3)", d).hide();
                    else {
                        $("dl:nth-child(1)", d).hide();
                        var c = b.content;
                        c && (c = $.trim(c.replace(/<br \/>/gi, ""))), $("dl:nth-child(2) textarea", d).val(c), $("dl:nth-child(2)", d).hide(), $("dl:nth-child(3) .c_intro", d).html(b.content), $("dl:nth-child(3)", d).show()
                    } else alert("保存失败");
                $(a).find(":submit").attr("disabled", !1)
            })
        }
    }), $("#companyProfile").bind("keyup", function () {
        var a = $(this),
            b = $.trim(a.val()).length;
        $.trim(a.val()).length > 1e3 ? a.val(a.val().substring(0, 1e3)) : $(this).siblings("span").length > 0 && (b > 20 || 20 == b) ? $(this).siblings("span").hide() : $(this).siblings("span").length > 0 && 20 > b ? $(this).siblings("span").show() : a.next(".word_count").children("span").text(1e3 - b)
    }), $("#companyDesForm").click(function (a) {
        a.stopPropagation()
    }), $("#delProfile").bind("click", function () {
        var c, b = $(this).parents(".profile_wrap");
        "" == $("#companyProfile").val() || "" == $(".c_intro", b).html() ? ($("dl:nth-child(1)", b).show(), $("dl:nth-child(2)", b).hide(), $("dl:nth-child(3)", b).hide()) : ($("dl:nth-child(1)", b).hide(), c = $("dl:nth-child(3)", b).find(".c_intro").text(), $("dl:nth-child(2)", b).find("#companyProfile").val(c), $("dl:nth-child(2)", b).hide(), $("dl:nth-child(3)", b).show())
    }), $("#editTags").click(function () {
        $("#c_tags_show").hide(), $("#c_tags_edit").show()
    }), $("#tagForms").validate({
        onkeyup: !1,
        focusCleanup: !0,
        rules: {
            city: {
                required: !0,
                checkCity: !0
            },
            industryField: {
                required: !0
            },
            companySize: {
                required: !0
            },
            companyUrl: {
                required: !0,
                checkUrl: !0,
                maxlength: 80
            }
        },
        messages: {
            city: {
                required: "请输入公司所在城市，如：广州"
            },
            industryField: {
                required: "请选择公司行业领域"
            },
            companySize: {
                required: "请选择公司规模"
            },
            companyUrl: {
                required: "请输入公司网址，如：www.zzlinks.cn",
                checkUrl: "请输入有效的公司网址",
                maxlength: "请输入80字符以内的网址"
            }
        },
        errorPlacement: function (a, b) {
            "hidden" == b.attr("type") ? a.insertAfter($(b).parent()) : a.insertAfter(b)
        }, submitHandler: function (a) {
            var b = $("#companyId").val(),
                c = $("#city", a).val(),
                d = $("#industryField", a).val(),
                e = $("#companySize", a).val(),
                f = $("#companyUrl", a).val();
            $(a).find(":submit").attr("disabled", !0), $.ajax({
                type: "POST",
                url: ctx + "/cd/saveProfileBaseInfo.json",
                data: {
                    companyId: b,
                    city: c,
                    industryField: d,
                    companySize: e,
                    companyUrl: f
                },
                dataType: "json"
            }).success(function (b) {
                b.success ? ($("#city", a).val(c), $("#industryField", a).val(d), $("#companySize", a).val(e), $("#companyUrl", a).val(f), $("#comCity", a).val(c), $("#comInd", a).val(d), $("#comSize", a).val(e), $("#comUrl", a).val(f), -1 != f.indexOf("http://") || -1 != f.indexOf("https://") ? $("#c_tags_show table").html("<tr><td>地点</td><td>" + b.content.city + "</td></tr>" + "<tr><td>领域</td><td>" + b.content.industryField + "</td></tr>" + "<tr><td>规模</td><td>" + b.content.companySize + "</td></tr>" + '<tr><td>主页</td><td><a href="' + b.content.companyUrl + '" target="_blank">' + b.content.companyUrl + "</a></td></tr>") : $("#c_tags_show table").html("<tr><td>地点</td><td>" + b.content.city + "</td></tr>" + "<tr><td>领域</td><td>" + b.content.industryField + "</td></tr>" + "<tr><td>规模</td><td>" + b.content.companySize + "</td></tr>" + '<tr><td>主页</td><td><a href="http://' + b.content.companyUrl + '" target="_blank">' + b.content.companyUrl + "</a></td></tr>"), $("#c_tags_show").show(), $("#c_tags_edit").hide()) : alert("保存失败"), $(a).find(":submit").attr("disabled", !1)
            })
        }
    }), $(document).click(function () {
        $("#box_sca").hide(), $("#box_fin").hide(), $("#stageform .selectBoxShort").hide(), $("#select_fin").removeClass("select_tags_focus"), $("#select_sca").removeClass("select_tags_focus")
    }), $("#select_sca").bind("click", function (a) {
        a.stopPropagation(), $(this).addClass("select_tags_focus"), $("#select_ind").removeClass("select_tags_focus"), $("#box_sca").show(), $("#box_fin").hide(), $("#stageform .selectBoxShort").hide(), $("#box_ind").hide()
    }), $("#box_sca").on("click", "ul li", function (a) {
        a.stopPropagation();
        var b = $(this).text();
        $("#select_sca").val(b).removeClass("select_tags_focus"), $("#companySize").val(b), $("#box_sca").hide()
    }), $("#box_fin,#box_sca").bind("click", function (a) {
        a.stopPropagation()
    }), $("#cancelFeatures").click(function () {
        var e, f, a = $(this).parents("#tagForms"),
            b = $("#comCity", a).val(),
            c = $("#comInd", a).val();
        $("#comFin", a).val(), e = $("#comSize", a).val(), f = $("#comUrl", a).val(), $("#city", a).val(b), $("#select_ind", a).val(c), $("#industryField", a).val(c), $("#companySize", a).val(e), $("#select_sca", a).val(e), $("#companyUrl", a).val(f), $("#c_tags_edit").hide(), $("#c_tags_show").show()
    }), $("#select_fin").bind("click", function (a) {
        a.stopPropagation(), $("#box_fin").show(), $("#stagesList .selectBoxShort").hide(), $("#box_sca").hide(), $("#box_ind").hide()
    }), $("#box_fin").on("click", "ul li", function (a) {
        a.stopPropagation();
        var b = $(this).text();
        $("#select_fin").val(b), $("#financeStage").val(b), $("#box_fin").hide()
    }), $(".c_stages .c_edit").bind("click", function () {
        $(this).hide(), $(".c_stages .stageshow").hide(), c = $(".c_stages #stageform").clone(), $(".c_stages #stageform").show(), $("#box_sca").hide()
    }), $(".c_stages").on("click", ".select_invest", function (a) {
        a.stopPropagation(), $("#box_sca").hide(), $(this).parents("li").siblings().children(".selectBoxShort").hide(), $(this).siblings(".selectBoxShort").show()
    }), $(".c_stages").on("click", ".selectBoxShort li", function (a) {
        var b, c;
        a.stopPropagation(), b = $(this).html(), c = $(this).parents("li"), $(".select_invest,.select_invest_hidden", c).val(b), $(this).parents(".selectBoxShort").hide(), c.index() == $("#stagesList > li").length - 1 && $("#stagesList > li").length < 10 && c.children(".select_invest").trigger("change")
    }), $(".c_stages").on("change", ".select_invest", function () {
        var a = $("#cloneInvest").html();
        $("#stagesList").append("<li>" + a + "</li>")
    }), $(".c_stages #stageform").validate({
        onkeyup: !1,
        focusCleanup: !0,
        rules: {
            stageorg: {
                required: !1,
                maxlength: 200
            }
        },
        messages: {
            stageorg: {
                maxlength: "请输入200字以内的投资机构"
            }
        },
        submitHandler: function (a) {
            var d, e, f, b = $("#financeStage").val(),
                c = "";
            c += "[", $("#stagesList > li").each(function (a) {
                d = $(this).children('input[name="select_invest_hidden"]').val(), e = $(this).children('input[name="stageorg"]').val() != $(this).children('input[name="stageorg"]').attr("placeholder") ? $(this).children('input[name="stageorg"]').val() : "", c += a == $("#stagesList > li").length - 1 ? '{"stage":"' + d + '","org":"' + e + '"}' : '{"stage":"' + d + '","org":"' + e + '"},'
            }), c += "]", f = $("#resubmitToken").val(), $(a).find(":submit").attr("disabled", !0), $.ajax({
                type: "POST",
                data: {
                    financeStage: b,
                    stages: c,
                    resubmitToken: f
                },
                url: ctx + "/c/saveStage.json",
                dataType: "json"
            }).done(function (b) {
                $("#resubmitToken").val(b.resubmitToken), b.success ? ($(".c_stages .stageshow li").eq(0).children("span").html(b.msg), "" != b.content ? 1 == $(".c_stages .stageshow li").length ? $(".c_stages .stageshow").append("<li>投资机构：<span>" + b.content + "</span></li>") : $(".c_stages .stageshow li").eq(1).children("span").html(b.content) : $(".c_stages .stageshow").html('<li>目前阶段：<span class="c5">' + b.msg + "</span></li>"), $(a).hide(), $(".c_stages .stageshow").show(), $(".c_stages .c_edit").show()) : alert("保存失败"), $(a).find(":submit").attr("disabled", !1)
            })
        }
    }), $(".c_stages").on("click", "#cancelStages", function () {
        var a = $(this).parents(".c_stages");
        a.children("dd").find("form").remove(), a.children("dd").append(c), a.find("form").hide(), $(".c_stages .stageshow").show(), $(".c_stages .c_edit").show()
    }), $(".new_portrait").on("mouseenter", "input", function () {
        $(".portrait_upload").css("backgroundColor", "#7e9597")
    }), $(".new_portrait").on("mouseleave", "input", function () {
        $(".portrait_upload").css("backgroundColor", "#93b7bb")
    }), d = {
        obj: $("#Reported"),
        addReport: function () {
            var a = this.obj.find(".newReport").children("li").clone();
            this.obj.find("ul.reset").append(a).removeClass("dn"), $(".reportForm", a).validate({
                onkeyup: !1,
                focusCleanup: !0,
                rules: {
                    articleTitle: {
                        required: !0,
                        specialchar: !0,
                        checkNum: !0
                    },
                    articleUrl: {
                        required: !0,
                        checkUrl: !0
                    }
                },
                messages: {
                    articleTitle: {
                        required: "请输入文章标题",
                        specialchar: "请输入有效的文章标题",
                        checkNum: "请输入有效的文章标题"
                    },
                    articleUrl: {
                        required: "请输入文章链接",
                        checkUrl: "请输入有效的文章链接"
                    }
                },
                submitHandler: function (a) {
                    var b = $('input[name="articleTitle"]', a).val() != $('input[name="articleTitle"]', a).attr("placeholder") ? $('input[name="articleTitle"]', a).val() : "",
                        c = $('input[name="articleUrl"]', a).val() != $('input[name="articleUrl"]', a).attr("placeholder") ? $('input[name="articleUrl"]', a).val() : "",
                        d = $(".article_id", a).val(),
                        e = $("#companyId").val(),
                        f = $("#resubmitToken").val();
                    $(a).find(":submit").attr("disabled", !0), $.ajax({
                        url: ctx + "/article/save.json",
                        type: "POST",
                        data: {
                            title: b,
                            url: c,
                            id: d,
                            companyId: e,
                            resubmitToken: f
                        },
                        dataType: "json"
                    }).done(function (b) {
                        var c, d, e;
                        $("#resubmitToken").val(b.resubmitToken), b.success ? (c = b.content, d = "", e = "", e = "http://" != c.url.substring(0, 7) ? "http://" + c.url : c.url, d = c.title, $(a).siblings("a.article").html(d).attr({
                            href: e,
                            title: c.title
                        }), $(".article_id", a).val(c.id), $(a).addClass("dn").siblings("a").show(), $(a).children(".btn_cancel_s").addClass("report_delete").removeClass("report_cancel").text("删除")) : console.log(b.msg), $(a).find(":submit").attr("disabled", !1)
                    })
                }
            })
        }, editReport: function (a) {
            var b = a.siblings("a.article").attr("title"),
                c = a.siblings("a.article").attr("href");
            a.siblings("form").children("input").eq(0).val(b), a.siblings("form").children("input").eq(1).val(c), a.hide().siblings("a").hide().siblings("form").removeClass("dn")
        }, delReport: function (a) {
            var b = this.obj,
                c = a.siblings(".article_id").val();
            $.ajax({
                url: ctx + "/article/del.json",
                type: "POST",
                data: {
                    id: c
                }
            }).done(function (c) {
                c.success ? (a.parent("form").parent("li").remove(), 0 == b.find("ul.reset").children("li").length ? (b.find(".c_add").addClass("dn"), b.find("ul.reset").addClass("dn").siblings(".reported_info").removeClass("dn")) : b.find(".c_add").removeClass("dn")) : console.log(c.msg)
            })
        }
    }, $("#Reported .c_reported .c_add").bind("click", function () {
        d.obj.find("ul.reset").children("li").length < 4 ? d.addReport() : (d.obj.find("ul.reset").children("li").length = 4) ? (d.addReport(), $(this).addClass("dn")) : $(this).addClass("dn")
    }), $("#Reported .c_reported .report_edit").bind("click", function () {
        $(this).parent(".reported_info").addClass("dn"), $("#Reported .c_reported .c_add").removeClass("dn"), d.addReport()
    }), $("#Reported").on("click", "ul .c_edit", function () {
        d.editReport($(this))
    }), $("#Reported").on("click", "ul .report_delete", function () {
        confirm("确定要删除此条报道吗？") && d.delReport($(this))
    }), $("#Reported").on("click", "ul .report_cancel", function () {
        $(this).parent("form").parent("li").remove(), 0 == d.obj.find("ul.reset").children("li").length ? (d.obj.find(".c_add").addClass("dn"), d.obj.find("ul.reset").addClass("dn").siblings(".reported_info").removeClass("dn")) : d.obj.find(".c_add").removeClass("dn")
    }), $(".reportForm").each(function () {
        $(this).validate({
            onkeyup: !1,
            focusCleanup: !0,
            rules: {
                articleTitle: {
                    required: !0,
                    specialchar: !0,
                    checkNum: !0
                },
                articleUrl: {
                    required: !0,
                    checkUrl: !0
                }
            },
            messages: {
                articleTitle: {
                    required: "请输入文章标题",
                    specialchar: "请输入有效的文章标题",
                    checkNum: "请输入有效的文章标题"
                },
                articleUrl: {
                    required: "请输入文章链接",
                    checkUrl: "请输入有效的文章链接"
                }
            },
            submitHandler: function (a) {
                var b = $('input[name="articleTitle"]', a).val() != $('input[name="articleTitle"]', a).attr("placeholder") ? $('input[name="articleTitle"]', a).val() : "",
                    c = $('input[name="articleUrl"]', a).val() != $('input[name="articleUrl"]', a).attr("placeholder") ? $('input[name="articleUrl"]', a).val() : "",
                    d = $(".article_id", a).val(),
                    e = $("#companyId").val(),
                    f = $("#resubmitToken").val();
                $(a).find(":submit").attr("disabled", !0), $.ajax({
                    url: ctx + "/article/save.json",
                    type: "POST",
                    data: {
                        title: b,
                        url: c,
                        id: d,
                        companyId: e,
                        resubmitToken: f
                    },
                    dataType: "json"
                }).done(function (b) {
                    var c, d, e;
                    $("#resubmitToken").val(b.resubmitToken), b.success ? (c = b.content, d = "", e = "", e = -1 != c.url.indexOf("http://") || -1 != c.url.indexOf("https://") ? c.url : "http://" + c.url, d = c.title, $(a).siblings("a.article").html(d).attr({
                        href: e,
                        title: c.title
                    }), $(".article_id", a).val(c.id), $(a).addClass("dn").siblings("a").show()) : console.log(b.msg), $(a).find(":submit").attr("disabled", !1)
                })
            }
        })
    })
});