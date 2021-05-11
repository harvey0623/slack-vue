(function(e){function t(t){for(var a,i,o=t[0],c=t[1],u=t[2],d=0,f=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},s=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/slack-vue/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0f0c":function(e,t,n){},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},"14ec":function(e,t,n){"use strict";n("a55e")},1701:function(e,t,n){"use strict";n("3c09")},2:function(e,t){},"20ec":function(e,t,n){},3:function(e,t){},"31ca":function(e,t,n){"use strict";n("7f4b")},3441:function(e,t,n){"use strict";n("eb3e")},"3c09":function(e,t,n){},4:function(e,t){},4796:function(e,t,n){},"484e":function(e,t,n){"use strict";n("4796")},5:function(e,t){},"54c0":function(e,t,n){"use strict";n("ede4")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i={name:"app"},o=i,c=n("2877"),u=Object(c["a"])(o,r,s,!1,null,null,null),l=u.exports,d=n("8c4f"),f=(n("7db0"),n("b0c0"),n("99af"),n("2f62")),h=n("1da1"),m=(n("96cf"),n("260b"));n("ea7b"),n("66ce"),n("588e");m["a"].initializeApp({apiKey:"AIzaSyCm5kn-3Cx3zCFbon3FpXpGTieOOvlSMko",authDomain:"slack-vue-1a6f6.firebaseapp.com",projectId:"slack-vue-1a6f6",storageBucket:"slack-vue-1a6f6.appspot.com",messagingSenderId:"1066323579198",appId:"1:1066323579198:web:61a87ec407328a7dcc1c6f",measurementId:"G-5TZG2RZF6H"}),a["default"].prototype.$firebase=m["a"];var p=m["a"],g={login:function(){return Object(h["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=new p.auth.GoogleAuthProvider,t.addScope("profile"),t.addScope("email"),e.next=5,p.auth().signInWithPopup(t).then((function(e){var t=e.additionalUserInfo.profile,n=t.email,a=t.given_name,r=t.picture,s=e.user.uid;return{status:!0,accessToken:e.credential.accessToken,profile:{name:a,email:n,picture:r,uid:s}}})).catch((function(e){return{status:!1,message:e.message}}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))()},logout:function(){return Object(h["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.auth().signOut();case 2:case"end":return e.stop()}}),e)})))()}},v={saveUser:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=p.database().ref("users"),a=e.uid,r=e.name,s=e.picture,t.next=4,n.child(a).set({name:r,avatar:s});case 4:case"end":return t.stop()}}),t)})))()},addChannel:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=p.database().ref("channels"),a=n.push().key,t.next=4,n.child(a).set({id:a,name:e}).then((function(){return{status:!0,message:""}})).catch((function(e){return{status:!1,message:e.message}}));case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}),t)})))()},addMessage:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.channelId,a=e.msgInfo,r=p.database().ref("messages"),t.next=4,r.child(n).push().set(a);case 4:case"end":return t.stop()}}),t)})))()},addPrivateMsg:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.channelId,a=e.msgInfo,r=p.database().ref("privateMsg"),t.next=4,r.child(n).push().set(a);case 4:case"end":return t.stop()}}),t)})))()},removePresence:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=p.database().ref("presence"),t.next=3,n.child(e).remove();case 3:case"end":return t.stop()}}),t)})))()}},b=g,y=v,C=(n("d3b7"),n("25f0"),n("3452")),w=n.n(C),x=w.a.enc.Utf8,I=w.a.enc.Base64,k=w.a.MD5,O=w.a.AES,_={encodeMd5:function(e){return k(e).toString()},encodeUtf8:function(e){return x.parse(e)},decodeUft8:function(e){return x.stringify(e)},encodeBase64:function(e){var t=this.encodeUtf8(e);return I.stringify(t)},decodeBase64:function(e){var t=I.parse(e);return this.decodeUft8(t)},encodeAes:function(e){return O.encrypt(e,"secret123").toString()},decodeAes:function(e){var t=O.decrypt(e,"secret123");return t.toString(x)},encodeAesJson:function(e){return this.encodeAes(JSON.stringify(e))},decodeAesJson:function(e){return JSON.parse(this.decodeAes(e))}},P={encodeUserInfo:function(e){var t=JSON.stringify(e),n=_.encodeAes(t);return _.encodeBase64(n)},decodeUserInfo:function(e){var t=_.decodeBase64(e),n=_.decodeAes(t);return JSON.parse(n)}},S={getItem:function(e){var t=localStorage.getItem(e);return null!==t?JSON.parse(t):null},setItem:function(e,t){localStorage.setItem(e,JSON.stringify(t))},removeItem:function(e){localStorage.removeItem(e)}};a["default"].prototype.$storage=S;var j=S,T=n("2ef0"),U=n.n(T),L={namespaced:!0,state:function(){return{profile:{},accessToken:""}},mutations:{setProfile:function(e,t){e.profile=t},setAccessToken:function(e,t){e.accessToken=t}},getters:{isLogin:function(e){var t=""!==e.accessToken,n=U.a.isEmpty(e.profile);return t&&!n}},actions:{checkHasUserInto:function(e){var t=e.commit,n=j.getItem("userInfo");if(null!==n){var a=P.decodeUserInfo(n.data),r=a.profile,s=a.accessToken;t("setProfile",r),t("setAccessToken",s)}},login:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,a=e.commit,e.dispatch,t.next=3,b.login();case 3:if(r=t.sent,!r.status){t.next=11;break}return t.next=7,y.saveUser(r.profile);case 7:a("setProfile",r.profile),a("setAccessToken",r.accessToken),s=P.encodeUserInfo({profile:n.profile,accessToken:n.accessToken}),j.setItem("userInfo",{data:s});case 11:return t.abrupt("return",{status:r.status,message:r.status?"":r.message});case 12:case"end":return t.stop()}}),t)})))()},logout:function(e){return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,a=e.commit,r=e.dispatch,s=e.rootState,t.next=3,y.removePresence(n.profile.uid);case 3:return t.next=5,b.logout();case 5:if(""===s.channelId){t.next=8;break}return t.next=8,r("removeEvent",null,{root:!0});case 8:a("setProfile",{}),a("setAccessToken",""),a("setFavorUser","",{root:!0}),j.removeItem("userInfo");case 12:case"end":return t.stop()}}),t)})))()}}},E=function(e){e.dispatch("authStore/checkHasUserInto"),e.subscribe((function(e,t){}))},M=p.database().ref("messages"),R=p.database().ref("privateMsg");a["default"].use(f["a"]);var N=new f["a"].Store({state:{channelId:"",channelLists:[],userLists:[],isPrivate:!1,favorUser:""},mutations:{setChannelId:function(e,t){e.channelId=t},setChannelItem:function(e,t){e.channelLists.push(t)},clearChannelLists:function(e){e.channelLists=[]},addUserItem:function(e,t){e.userLists.push(t)},changeUserOnlineStatus:function(e,t){var n=e.userLists.find((function(e){return e.uid===t.userId}));void 0!==n&&(n.isOnline=t.status)},clearUserLists:function(e){e.userLists=[]},setIsPrivate:function(e,t){e.isPrivate=t},setFavorUser:function(e,t){e.favorUser=t}},getters:{channelName:function(e){var t=e.channelLists.find((function(t){return t.id===e.channelId})),n=e.userLists.find((function(t){return t.uid===e.channelId}));return void 0!==t?t.name:void 0!==n?n.name:""}},actions:{removeEvent:function(e){var t=e.state,n=e.commit;if(t.isPrivate){var a=t.channelId,r=t.authStore.profile.uid,s=a<r?"".concat(a,"/").concat(r):"".concat(r,"/").concat(a);R.child(s).off("child_added")}else M.child(t.channelId).off("child_added");n("setIsPrivate",!1)}},modules:{authStore:L},plugins:[E]}),B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"chatPage"},[n("div",{staticClass:"sidebarOuter"},[n("sidebar",{on:{logout:e.logoutHandler,openModal:e.openModal}})],1),n("div",{staticClass:"contentOuter"},[n("Message")],1),n("Loading",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]}),n("div",{staticClass:"modal fade",attrs:{id:"channelModal"}},[n("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[e._m(0),n("div",{staticClass:"modal-body"},[n("form",[n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.new_channel,expression:"new_channel",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"new_channel",name:"new_channel",placeholder:"Channel name",autocomplete:"off"},domProps:{value:e.new_channel},on:{input:function(t){t.target.composing||(e.new_channel=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),n("ul",{staticClass:"list-group"},[n("li",{directives:[{name:"show",rawName:"v-show",value:e.hasAddError,expression:"hasAddError"}],staticClass:"list-group-item text-danger"},[e._v(" "+e._s(e.addError)+" ")])])])]),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-secondary",attrs:{"data-dismiss":"modal"}},[e._v("Cancle")]),n("button",{staticClass:"btn btn-primary",on:{click:e.addChannel}},[e._v("Add Channel")])])])])])],1)},A=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal-header"},[n("h5",{staticClass:"modal-title text-dark"},[e._v("Channel name")]),n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])])}],F=n("5530"),H=(n("5319"),n("ac1f"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"sidebar"}},[n("div",{staticClass:"block userBlock"},[n("img",{staticClass:"avatarImg",attrs:{src:e.userProfile.picture}}),n("p",{staticClass:"userName"},[e._v(e._s(e.userProfile.name))]),n("button",{staticClass:"btn btn-outline-light btn-logout",on:{click:e.logout}},[e._v("登出")])]),n("div",{staticClass:"block channelBlock"},[n("h3",{on:{click:function(t){e.showChannel=!e.showChannel}}},[n("span",[e._v("Channels")]),n("span",{staticClass:"count"},[e._v("("+e._s(e.totalChannel)+")")]),n("i",{staticClass:"fa fa-caret-down",class:{rotate:!e.showChannel},attrs:{"aria-hidden":"true"}})]),n("div",{staticClass:"toggle",class:{show:e.showChannel}},e._l(e.channelLists,(function(e){return n("ChannelItem",{key:e.id,attrs:{id:e.id,channelName:e.name}})})),1)]),n("div",{staticClass:"block friendBlock"},[n("h3",{on:{click:function(t){e.showFriend=!e.showFriend}}},[n("span",[e._v("Friends")]),n("span",{staticClass:"count"},[e._v("("+e._s(e.totalUser)+")")]),n("i",{staticClass:"fa fa-caret-down",class:{rotate:!e.showFriend},attrs:{"aria-hidden":"true"}})]),n("div",{staticClass:"toggle",class:{show:e.showFriend}},e._l(e.userLists,(function(e){return n("Users",{key:e.uid,attrs:{userId:e.uid,userName:e.name,avatar:e.avatar,isOnline:e.isOnline}})})),1)])])}),G=[],q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"channel-item",class:{active:e.isActive},on:{click:e.changeChannel}},[e._v(" "+e._s(e.channelName)+" ")])},D=[],J={props:{id:{type:String,required:!0},channelName:{type:String,required:!0}},computed:{channelId:function(){return this.$store.state.channelId},isActive:function(){return this.id===this.channelId}},methods:{changeChannel:function(){this.$store.commit("setChannelId",this.id),this.$store.commit("setIsPrivate",!1)}}},K=J,W=(n("484e"),Object(c["a"])(K,q,D,!1,null,"a0d6dffe",null)),z=W.exports,Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"user-item",class:{active:e.isActive},on:{click:e.changeUser}},[n("img",{attrs:{src:e.avatar}}),n("span",{staticClass:"light",class:{isOnline:e.isOnline}}),n("p",[e._v(e._s(e.userName))])])},V=[],X={props:{userId:{type:String,required:!0},userName:{type:String,required:!0},avatar:{type:String,required:!0},isOnline:{type:Boolean,required:!0}},computed:{isActive:function(){return this.$store.state.channelId===this.userId},favorUser:function(){return this.$store.state.favorUser}},methods:{changeUser:function(){this.$store.commit("setChannelId",this.userId),this.$store.commit("setIsPrivate",!0),this.$store.commit("setFavorUser","")}},watch:{favorUser:function(e){""!==e&&e===this.userId&&this.changeUser()}}},Y=X,Q=(n("54c0"),Object(c["a"])(Y,Z,V,!1,null,"a75c499c",null)),ee=Q.exports,te=p.database().ref("users"),ne=p.database().ref(".info/connected"),ae=p.database().ref("presence"),re={components:{ChannelItem:z,Users:ee},data:function(){return{showChannel:!0,showFriend:!0}},computed:Object(F["a"])(Object(F["a"])(Object(F["a"])({},Object(f["c"])("authStore",{userProfile:"profile"})),Object(f["c"])(["channelLists","userLists"])),{},{totalChannel:function(){return this.channelLists.length},totalUser:function(){return this.userLists.length}}),methods:Object(F["a"])(Object(F["a"])({},Object(f["b"])(["changeUserOnlineStatus"])),{},{logout:function(){this.$emit("logout")},openModal:function(){this.$emit("openModal")},userCallback:function(e){this.userProfile.uid!==e.key&&this.$store.commit("addUserItem",Object(F["a"])(Object(F["a"])({},e.val()),{},{uid:e.key,isOnline:!1}))},detectOnline:function(e){var t=e.val();if(t){var n=ae.child(this.userProfile.uid);n.set(!0),n.onDisconnect().remove()}},addUserEvent:function(){te.on("child_added",this.userCallback),ne.on("value",this.detectOnline),ae.on("child_added",this.addPresence),ae.on("child_removed",this.removePresence)},addPresence:function(e){var t=e.key;t!==this.userProfile.uid&&this.changeUserOnlineStatus({userId:t,status:!0})},removePresence:function(e){e.key!==this.userProfile.uid&&this.changeUserOnlineStatus({userId:e.key,status:!1})}}),mounted:function(){this.addUserEvent()},beforeDestroy:function(){te.off("child_added",this.userCallback),ne.off("value",this.detectOnline),ae.off("child_added",this.addPresence),ae.off("child_removed",this.removePresence),this.$store.commit("clearUserLists")}},se=re,ie=(n("7a24"),Object(c["a"])(se,H,G,!1,null,"1bb9dff2",null)),oe=ie.exports,ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"messageOuter"},[e.isOpenChannel?n("div",{staticClass:"channelBar"},[e._v("Channel: "+e._s(e.channelName))]):e._e(),n("div",{ref:"messageContent",staticClass:"messageContent"},[e.isOpenChannel?n("div",{staticClass:"single-group"},e._l(e.msgLists,(function(t){return n("SingleMessage",{key:t.msgId,attrs:{msgId:t.msgId,content:t.content,contentType:t.contentType,userName:t.user.name,userId:t.user.id,avatar:t.user.avatar,timestamp:t.timestamp},on:{toBottom:e.scrollToBottom,selectImg:e.selectImg}})})),1):n("div",{staticClass:"emptyBlock"},[n("i",{staticClass:"fa fa-commenting-o",attrs:{"aria-hidden":"true"}}),n("p",[e._v("講幹話吧~")])])]),e.isOpenChannel?n("MessageForm",{on:{sendMsg:e.sendMsg,uploadFile:e.uploadFileHandler}}):e._e(),n("ProgressLoading",{attrs:{isUploading:e.isUploading,uploadPercent:e.uploadPercent}}),n("Lightbox",{attrs:{isOpen:e.lightBoxIsOpen,totalGallery:e.totalGallery,galleryIndex:e.galleryIndex},on:{"update:isOpen":function(t){e.lightBoxIsOpen=t},"update:is-open":function(t){e.lightBoxIsOpen=t},"update:galleryIndex":function(t){e.galleryIndex=t},"update:gallery-index":function(t){e.galleryIndex=t},count:e.countGalleryIndex},scopedSlots:e._u([{key:"default",fn:function(){return[n("div",{staticClass:"photoFrame"},[n("img",{attrs:{src:e.photoUrl,alt:""}})])]},proxy:!0}])})],1)},ue=[],le=(n("4de4"),n("c740"),n("ec26")),de=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"message-row",class:{myself:e.isSelf}},[n("img",{staticClass:"userAvatar",attrs:{src:e.avatar},on:{click:e.switchUser}}),"text"===e.contentType?n("p",{staticClass:"text",domProps:{innerHTML:e._s(e.msgText)}}):n("div",{staticClass:"imgOuter"},[n("img",{directives:[{name:"load",rawName:"v-load",value:e.msgText,expression:"msgText"}],attrs:{src:e.placeholderUrl},on:{click:e.imgClickHandler}})]),n("p",{staticClass:"time"},[e._v(e._s(e.releaseTime))])])},fe=[],he=(n("a9e3"),{props:{msgId:{type:String,required:!0},content:{type:String,required:!0},contentType:{type:String,required:!0},userName:{type:String,required:!0},userId:{type:String,required:!0},avatar:{type:String,required:!0},timestamp:{type:Number,required:!0}},data:function(){return{placeholderUrl:n("59e0"),isPreloaded:!1}},directives:{load:{inserted:function(e,t,n){var a=t.value,r=new Image;r.onload=function(){e.src=a,n.context.$emit("toBottom"),n.context.isPreloaded=!0},r.src=a}}},computed:{userProfile:function(){return this.$store.state.authStore.profile},releaseTime:function(){var e=new Date(this.timestamp),t=e.getFullYear(),n=e.getMonth()+1,a=e.getDate(),r=e.getHours(),s=e.getMinutes();return n=n<10?"0".concat(n):n,a=a<10?"0".concat(a):a,r=r<10?"0".concat(r):r,s=s<10?"0".concat(s):s,"".concat(t,"/").concat(n,"/").concat(a," ").concat(r,":").concat(s)},isSelf:function(){return this.$store.state.authStore.profile.uid===this.userId},msgText:function(){return"text"!==this.contentType?this.content:this.urlify(this.content)}},methods:{imgClickHandler:function(){this.isPreloaded&&"image"===this.contentType&&this.$emit("selectImg",{msgId:this.msgId})},switchUser:function(){this.userProfile.uid!==this.userId&&this.$store.commit("setFavorUser",this.userId)},urlify:function(e){var t=/(https?:\/\/[^\s]+)/g;return e.replace(t,(function(e){return'<a href="'.concat(e,'" class="msg-web-url" target="_blank">').concat(e,"</a>")}))}}}),me=he,pe=(n("c060"),Object(c["a"])(me,de,fe,!1,null,"52fba120",null)),ge=pe.exports,ve=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"messageform"},[n("div",{staticClass:"inputGroup"},[n("label",{staticClass:"iconBox"},[n("i",{staticClass:"fa fa-picture-o",attrs:{"aria-hidden":"true"}}),n("input",{ref:"file",staticClass:"form-control",attrs:{type:"file",hidden:""},on:{change:e.fileChange}})]),n("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.message,expression:"message",modifiers:{trim:!0}}],ref:"textarea",staticClass:"msgInput",attrs:{placeholder:"message..."},domProps:{value:e.message},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),t.ctrlKey||t.shiftKey||t.altKey||t.metaKey?null:e.sendMessage(t))},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:t.ctrlKey?(t.preventDefault(),e.newLine(t)):null},compositionstart:function(t){e.isEditing=!0},compositionend:function(t){e.isEditing=!1},input:function(t){t.target.composing||(e.message=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("div",{staticClass:"iconBox",on:{click:e.sendMessage}},[n("i",{staticClass:"fa fa-paper-plane",attrs:{"aria-hidden":"true"}})])])])},be=[],ye=(n("caad"),n("1276"),n("cc1d")),Ce={data:function(){return{message:"",isEditing:!1}},computed:{channelId:function(){return this.$store.state.channelId}},methods:{newLine:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.target.selectionStart,e.target.setRangeText("\n",a,a,"end"),t.message=e.target.value,n.next=5,t.$nextTick();case 5:t.$refs.textarea.scrollTop=t.$refs.textarea.scrollHeight;case 6:case"end":return n.stop()}}),n)})))()},sendMessage:function(){this.isEditing||""!==this.message&&(this.$emit("sendMsg",{msg:this.message,type:"text"}),this.message="")},validateFile:function(e){var t=["image/jpeg","image/jpg","image/png"],n=t.includes(e.type),a=Math.floor(e.size/1024/1024)<=3;return n&&a},fileChange:function(e){var t=e.target.files[0];if(void 0!==t){var n=this.validateFile(t);if(!n)return alert("只能上傳3MB圖片檔案"),void this.resetFile();this.uploadHandler(t)}},uploadHandler:function(e){var t=e.type.split("/")[1],n={contentType:ye.lookup(e.name)};this.$emit("uploadFile",{file:e,extension:t,metadata:n}),this.resetFile()},resetFile:function(){this.$refs.file.type="text",this.$refs.file.type="file"}}},we=Ce,xe=(n("3441"),Object(c["a"])(we,ve,be,!1,null,"6c459422",null)),Ie=xe.exports,ke=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],staticClass:"lightBox"},[n("div",{staticClass:"closeBox",on:{click:e.closeHandler}},[n("i",{staticClass:"fa fa-times",attrs:{"aria-hidden":"true"}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isThnaOne,expression:"isThnaOne"}],staticClass:"dirBox left",class:{disabled:e.isStart},on:{click:function(t){return e.dirHandler(-1)}}},[n("i",{staticClass:"fa fa-chevron-left",attrs:{"aria-hidden":"true"}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isThnaOne,expression:"isThnaOne"}],staticClass:"dirBox right",class:{disabled:e.isEnd},on:{click:function(t){return e.dirHandler(1)}}},[n("i",{staticClass:"fa fa-chevron-right",attrs:{"aria-hidden":"true"}})]),e._t("default",null,{namer:"default"})],2)},Oe=[],_e={props:{isOpen:{type:Boolean,default:!1},totalGallery:{type:Number,required:!0},galleryIndex:{type:Number,required:!0}},computed:{isThnaOne:function(){return this.totalGallery>1},isStart:function(){return 0===this.galleryIndex},isEnd:function(){return this.galleryIndex===this.totalGallery-1}},methods:{closeHandler:function(){this.$emit("update:isOpen",!1),this.$emit("update:galleryIndex",0)},keyupHandler:function(e){if(this.isOpen){var t=e.keyCode;return 27===t?this.closeHandler():39===t?this.$emit("count",1):37===t?this.$emit("count",-1):void 0}},dirHandler:function(e){this.$emit("count",e)}},mounted:function(){document.addEventListener("keyup",this.keyupHandler)},beforeDestroy:function(){document.removeEventListener("keyup",this.keyupHandler)}},Pe=_e,Se=(n("1701"),Object(c["a"])(Pe,ke,Oe,!1,null,"717b8c78",null)),$e=Se.exports,je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.isUploading,expression:"isUploading"}],attrs:{id:"progress-loading"}},[n("div",{staticClass:"progress-content"},[n("div",{staticClass:"progress"},[n("p",{staticClass:"loadingText"},[e._v("上傳中...")]),n("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",style:e.progressWidth})])])])},Te=[],Ue={props:{isUploading:{type:Boolean,default:!1},uploadPercent:{type:Number,required:!0}},computed:{progressWidth:function(){return{width:"".concat(this.uploadPercent,"%")}}}},Le=Ue,Ee=(n("de7e"),Object(c["a"])(Le,je,Te,!1,null,"05657aca",null)),Me=Ee.exports,Re=p.database().ref("messages"),Ne=p.database().ref("privateMsg"),Be=p.storage().ref(),Ae={components:{SingleMessage:ge,MessageForm:Ie,ProgressLoading:Me,Lightbox:$e},data:function(){return{msgLists:[],uploadPercent:0,isUploading:!1,galleryIndex:0,lightBoxIsOpen:!1}},computed:Object(F["a"])(Object(F["a"])(Object(F["a"])({},Object(f["c"])(["channelId","isPrivate"])),Object(f["c"])("authStore",{userProfile:"profile"})),{},{channelName:function(){return this.$store.getters.channelName},isOpenChannel:function(){return""!==this.channelName},privateChildRef:function(){var e=this.channelId,t=this.userProfile.uid;return this.channelId<this.userProfile.uid?"".concat(e,"/").concat(t):"".concat(t,"/").concat(e)},imageGallery:function(){return this.msgLists.filter((function(e){return"image"===e.contentType}))},totalGallery:function(){return this.imageGallery.length},photoUrl:function(){var e=this.imageGallery[this.galleryIndex];return void 0!==e?e.content:""}}),methods:{sendMsg:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function n(){var a,r,s,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.msg,r=e.type,s={content:a,contentType:r,timestamp:p.database.ServerValue.TIMESTAMP,user:{name:t.userProfile.name,avatar:t.userProfile.picture,id:t.userProfile.uid}},i=t.isPrivate?"addPrivateMsg":"addMessage",n.next=5,y[i]({channelId:t.isPrivate?t.privateChildRef:t.channelId,msgInfo:s});case 5:case"end":return n.stop()}}),n)})))()},scrollToBottom:function(){var e=this.$refs.messageContent;void 0!==e&&(e.scrollTop=e.scrollHeight)},msgCallback:function(e){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.msgLists.push(Object(F["a"])({msgId:e.key},e.val())),n.next=3,t.$nextTick();case 3:t.scrollToBottom();case 4:case"end":return n.stop()}}),n)})))()},addMsgEvent:function(){""!==this.channelId&&(this.isPrivate?Ne.child(this.privateChildRef).on("child_added",this.msgCallback):Re.child(this.channelId).on("child_added",this.msgCallback))},getStoragePath:function(){var e=this.channelId;return this.isPrivate?"chat/private/".concat(e):"chat/public/".concat(e)},uploadFileHandler:function(e){var t=this,n=e.file,a=e.extension,r=e.metadata,s="".concat(this.getStoragePath(),"/").concat(Object(le["a"])(),".").concat(a),i=Be.child(s).put(n,r);this.isUploading=!0,i.on("state_change",(function(e){t.uploadPercent=e.bytesTransferred/e.totalBytes*100}),(function(){t.isUploading=!1,t.uploadPercent=0,alert("上傳發生錯誤")}),Object(h["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.snapshot.ref.getDownloadURL();case 2:return n=e.sent,e.next=5,t.sendMsg({msg:n,type:"image"});case 5:t.isUploading=!1,t.uploadPercent=0;case 7:case"end":return e.stop()}}),e)}))))},selectImg:function(e){var t=e.msgId;this.galleryIndex=this.imageGallery.findIndex((function(e){return e.msgId===t})),-1!==this.galleryIndex&&(this.lightBoxIsOpen=!0)},countGalleryIndex:function(e){var t=this.galleryIndex+e;t>this.totalGallery-1?this.galleryIndex=this.totalGallery-1:this.galleryIndex=t<0?0:t}},mounted:function(){this.addMsgEvent()},watch:{channelId:function(e,t){""!==e&&""!==t&&Re.child(t).off("child_added",this.msgCallback)},privateChildRef:function(e,t){Ne.child(t).off("child_added",this.msgCallback),this.msgLists=[],this.addMsgEvent()}}},Fe=Ae,He=(n("31ca"),Object(c["a"])(Fe,ce,ue,!1,null,"81f7ff8e",null)),Ge=He.exports,qe=p.database().ref("channels"),De={name:"chat",components:{Sidebar:oe,Message:Ge},data:function(){return{isLoading:!1,new_channel:"",addError:""}},computed:Object(F["a"])({hasAddError:function(){return""!==this.addError}},Object(f["c"])(["channelLists","channelId"])),methods:{logoutHandler:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,e.$store.dispatch("authStore/logout");case 3:e.$router.replace("/login"),e.isLoading=!1;case 5:case"end":return t.stop()}}),t)})))()},openModal:function(){$("#channelModal").modal("show")},checkSameChannel:function(){var e=this,t=this.channelLists.find((function(t){return t.name.toLowerCase()===e.new_channel.toLowerCase()}));return void 0!==t},addChannel:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.addError="",""!==e.new_channel){t.next=3;break}return t.abrupt("return",e.addError="請輸入頻道名稱");case 3:if(n=e.checkSameChannel(),!n){t.next=6;break}return t.abrupt("return",e.addError="已有相同的頻道");case 6:return e.isLoading=!0,t.next=9,y.addChannel(e.new_channel);case 9:a=t.sent,a.status&&(e.new_channel="",$("#channelModal").modal("hide")),e.isLoading=!1;case 12:case"end":return t.stop()}}),t)})))()},channelCallback:function(e){this.$store.commit("setChannelItem",e.val())},addChannelEvent:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:qe.on("child_added",e.channelCallback);case 1:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.addChannelEvent()},beforeDestroy:function(){this.$store.commit("setChannelId",""),this.$store.commit("clearChannelLists"),qe.off("child_added",this.channelCallback)}},Je=De,Ke=(n("14ec"),Object(c["a"])(Je,B,A,!1,null,"334ae296",null)),We=Ke.exports,ze=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"loginPage"},[n("div",{staticClass:"custom_container"},[n("div",[n("h2",{ref:"chatroomTitle",staticClass:"chatroomTitle",class:{active:e.showTitle}},[e._v("幹話聊天室")]),e._m(0)]),n("div",{staticClass:"text-center"},[n("button",{staticClass:"btn btn-danger google-login",on:{click:e.loginWithGoogle}},[e._v(" Google 登入 ")]),n("p",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"validate-error"},[e._v(e._s(e.loginErrorMsg))])])]),n("Loading",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]})],1)},Ze=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"iconBox"},[n("i",{staticClass:"fa fa-commenting-o",attrs:{"aria-hidden":"true"}})])}],Ve={name:"login",data:function(){return{isLoading:!1,showTitle:!1,loginErrorMsg:""}},computed:{hasError:function(){return""!==this.loginErrorMsg}},methods:{loginWithGoogle:function(){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function t(){var n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,e.loginErrorMsg="",t.next=4,e.$store.dispatch("authStore/login");case 4:n=t.sent,a=n.status,r=n.message,e.loginErrorMsg=r,a&&e.$router.replace("/chat"),e.isLoading=!1;case 10:case"end":return t.stop()}}),t)})))()},createCurveText:function(){new CircleType(this.$refs.chatroomTitle).radius(360),this.showTitle=!0}},mounted:function(){this.createCurveText()}},Xe=Ve,Ye=(n("c059"),Object(c["a"])(Xe,ze,Ze,!1,null,"b992c644",null)),Qe=Ye.exports;a["default"].use(d["a"]);var et=[{path:"/chat",name:"chat",component:We,meta:{auth:!0}},{path:"/login",name:"login",component:Qe,beforeEnter:function(e,t,n){return N.getters["authStore/isLogin"]?n("/chat"):n()}},{path:"*",redirect:"/login"}],tt=new d["a"]({mode:"hash",routes:et});tt.beforeEach((function(e,t,n){return e.matched.some((function(e){return!0===e.meta.auth}))?N.getters["authStore/isLogin"]?n():n("/login"):n()}));var nt=tt,at=n("a6f4"),rt=(n("c1c3"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loading"}},[n("div",{staticClass:"loader"},[n("svg",{staticClass:"circular-loader",attrs:{viewBox:"25 25 50 50"}},[n("circle",{staticClass:"loader-path",attrs:{cx:"50",cy:"50",r:"20"}})])])])}),st=[],it={},ot=it,ct=(n("9d46"),Object(c["a"])(ot,rt,st,!1,null,"60151d44",null)),ut=ct.exports;a["default"].component("Loading",ut),a["default"].config.productionTip=!1,a["default"].use(at["a"]),new a["default"]({router:nt,store:N,render:function(e){return e(l)}}).$mount("#app")},"59e0":function(e,t,n){e.exports=n.p+"img/placeholder.3206ed4c.png"},6:function(e,t){},"62e2":function(e,t,n){},6523:function(e,t,n){},7:function(e,t){},"7a24":function(e,t,n){"use strict";n("6523")},"7f4b":function(e,t,n){},8:function(e,t){},9:function(e,t){},"9d46":function(e,t,n){"use strict";n("62e2")},a55e:function(e,t,n){},c059:function(e,t,n){"use strict";n("0f0c")},c060:function(e,t,n){"use strict";n("e4d5")},c1c3:function(e,t,n){},de7e:function(e,t,n){"use strict";n("20ec")},e4d5:function(e,t,n){},eb3e:function(e,t,n){},ede4:function(e,t,n){}});
//# sourceMappingURL=app.js.map