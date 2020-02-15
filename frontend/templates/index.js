// 当前环境：b for broswer, c for client

const env = "b";

const ipcRenderer = env === 'c' ? require('electron').ipcRenderer : null;

let groupProcess = new TWEEN.Group();

Vue.component('j-recommend-list-pop', {
    props: ['posts'],
    template: `
        <div class="j-recommend-list j-recommend-list-pop">
            <div class="j-title-line">
                <span class="j-title">歌单推荐</span>
                <span class="j-line"></span>
            </div>
            <div class="j-recommend-items">
                <div class="j-recommend-item" v-for="post in posts">
                    {{post.title}}
                </div>
            </div>
        </div>
  `
});

Vue.component('todo-list', {
    data: function() {
        return {}
    },
    props: ['todos'],
    template:`
      <div class="todo-list">
        <p>已完成：{{todos.filter(todo => todo.done === true).length}}</p>
        <p>未完成：{{todos.filter(todo => todo.done === false).length}}</p>
        <div class="todo-item" v-for="todo in todos">
          <div class="title">{{todo.title}}</div>
          <div class="content">{{todo.content}}</div>
          <div class="button" v-show="!todo.done">点击完成</div>
          <div class="button" v-show="todo.done">已完成</div>
        </div>
      </div>
      `
});


Vue.component('j-table-page-bar', {
    data: function() {
        return {}
    },
    props: ['pages'],
    template:`
        <div class="j-table-page-bar">
            <div class="j-table-page-prev" actived="false">上一页</div>
            <div class="j-table-pages">

                <div class="j-table-page" actived>1</div>
                <div class="j-table-page-hidden"><i class="mdi mdi-dots-horizontal mdi-16px"></i></div>
                <div class="j-table-page">4</div>
                <div class="j-table-page">5</div>
                <div class="j-table-page">6</div>
                <div class="j-table-page-hidden"><i class="mdi mdi-dots-horizontal mdi-16px"></i></div>
                <div class="j-table-page">{{pages}}</div>

            </div>
            <div class="j-table-page-next">下一页</div>
        </div>
    `
});




Vue.component('j-list', {
    data: function() {
        return {}
    },
    props: ['dosls'],
    template:`
        <div class="j-list">
            <div class="j-table j-table-rank">
                <div class="j-table-head">
                    <div class="j-tr-head">
                        <div class="j-tw j-tw-10">
                            <span>序号</span>
                            <a class="j-btn j-btn-s j-btn-sort">
                                <i class="icon-sort-u"></i>
                            </a>

                        </div>
                        <div class="j-tw j-tw-70">
                            <span>标题</span>
                        </div>
                        <div class="j-tw j-tw-10">
                            <span>时长</span>
                        </div>
                        <div class="j-tw j-tw-10">
                            <span>歌手</span>
                        </div>
                    </div>
                </div>
                <div class="j-table-body">
                
                    <div class="j-tr" v-for="dosl in dosls" :class="{'j-tr-white': dosl.id%2 != 0, 'j-tr-gray': dosl.id%2 == 0}">
                        <div class="j-tw-10">
                            {{dosl.id}}
                        </div>
                        <div class="j-tw-70">
                            <a>{{dosl.title}}</a>
                            <div class="j-fun-group">
                                <a href="#" class="j-btn j-btn-s">
                                    <i class="mdi mdi-play-outline mdi-18px"></i>
                                </a>
                                <a href="#" class="j-btn j-btn-s">
                                    <i class="mdi mdi-plus mdi-18px"></i>
                                </a>
                                <a href="#" class="j-btn j-btn-s">
                                    <i class="mdi mdi-heart-outline mdi-16px"></i>
                                </a>
                            </div>
                        </div>
                        <div class="j-tw-10">
                            {{dosl.duration}}
                        </div>
                        <div class="j-tw-10">
                            {{dosl.singer}}
                        </div>
                    </div>

                </div>
                <j-table-page-bar v-bind:pages="dosls.length"></j-table-page-bar>
            </div>
        </div>
     `
});






let main = new Vue({
    el: "#main",
    data: {
        played: false,
        maximized: false,
        currentTime: "00:00",
        duration: "00:00",
        result: "测试",
        dragged: false,
        current: 2,
        volume: 0,
        cardList: [
            {title: '0'},
            {title: '1'},
            {title: '2'},
            {title: '3'},
            {title: '4'},
            {title: '5'},
            {title: '6'},
            {title: '7'},
            {title: '8'},
            {title: '9'},
        ],
        posts: [
            {id: 1, title: '1'},
            {id: 2, title: '2'},
            {id: 3, title: '3'},
            {id: 4, title: '4'},
            {id: 5, title: '5'},
        ],
        todos: [
            {
                title: '待办 1',
                content: '上课之前要抄一下同学的作业。',
                done: false
            },
            {
                title: '待办 2',
                content: '课间和朋友去球场打篮球。',
                done: true
            },
            {
                title: '待办 3',
                content: '英语课上故意调皮一下让美丽的英语老师注意到然后提问我。',
                done: false
            },
            {
                title: '待办 4',
                content: '放学后赶紧跑，绝对不能听某些人的话：「放学后你给我等着」。',
                done: false
            }
        ],
        dosls: [
            {
                id: 1,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 2,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 3,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 4,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 5,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 6,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 7,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 8,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 9,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 10,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 11,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 12,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 13,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 14,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 15,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 16,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 17,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 18,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 19,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 20,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 21,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 22,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 23,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 24,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 25,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 26,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 27,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 28,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 29,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
            {
                id: 30,
                title: '灰姑娘',
                duration: '04:53',
                singer: '陈雪凝'
            },
        ]

    },
    methods: {
        play: function () {
            if (this.$refs['j-audio'].paused) {
                this.played = true;
                this.$refs['j-audio'].play();
            } else {
                this.played = false;
                this.$refs['j-audio'].pause();
            }
        },

        cont: function (time, fmt) {

            let o = {
                "m+": Math.floor(time / 60),
                "s+": time % 60,
            };

            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;

        },

        getDuration: function () {
            let duration = Math.floor(this.$refs['j-audio'].duration);
            this.duration = this.cont(duration, 'mm:ss');

        },

        getCurrentTime: function () {
            let currentTime = Math.floor(this.$refs['j-audio'].currentTime);
            let duration = Math.floor(this.$refs['j-audio'].duration);

            if (!this.dragged) {
                this.currentTime = this.cont(currentTime, 'mm:ss');
                let rate = currentTime / duration * 100;
                // this.$refs['j-process-play'].style.width = rate + '%';

                function animate(time) {
                    requestAnimationFrame(animate);
                    groupProcess.update(time);
                }

                let elem = this.$refs['j-process-play'];
                let coords = { x: elem.style.width.replace('%','') };
                let tween = new TWEEN.Tween(coords, groupProcess)
                    .to({ x: rate}, 2000)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(function() {
                        elem.style.width = coords.x +'%';
                    })
                    .start();

                animate();

            }

            if (this.currentTime === this.duration) {
                this.played = false;
                this.$refs['j-audio'].pause();
            }
        },

        setDuration: function (time) {

        },

        setCurrentTime: function (time) {
            this.currentTime = this.cont(time, 'mm:ss');
            this.$refs['j-audio'].currentTime = time;
        },

        screenMax: function () {
            j_video_screen.$el.width = 560;
        },

        screenMid: function () {
            j_video_screen.$el.width = 480;
        },

        screenMin: function () {
            j_video_screen.$el.width = 320;
        },

        open: function () {
            temp.$el.click();
        },

        upload: function () {
            // alert(this.$el.files[0]);
            console.log(this.$el.files);
            let file = this.$el.files[0];
            let name = file.name;
            let size = file.size;
            console.log("文件名:" + name + "大小:" + size);

            let reader = new FileReader();

            reader.onload = function () {
                //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
                console.log(this.result);
            }
        },

        move: function (e) {

            this.dragged = true;

            groupProcess.removeAll();

            let tar = e.target;        //获取目标元素

            let el = this.$refs['j-process-play'];

            //算出鼠标相对元素的位置
            let disX = e.clientX - el.offsetWidth;

            let rate = 0;

            document.onmousemove = (e) => {       //鼠标按下并移动的事件
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;

                // 移动当前元素

                if (left < 0) {
                    left = 0;
                } else if (left >= this.$refs['j-process-bar'].offsetWidth) {
                    left = this.$refs['j-process-bar'].offsetWidth;
                }

                rate = left / this.$refs['j-process-bar'].offsetWidth * 100;
                el.style.width = rate + '%';

                this.currentTime = this.cont(Math.floor(rate * this.$refs['j-audio'].duration / 100), 'mm:ss');

                // 防止选择内容
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            };

            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
                this.dragged = false;
                this.setCurrentTime(Math.floor(rate * this.$refs['j-audio'].duration / 100));
            };
        },

        adjustVolume: function (e) {

            let tar = e.target;        //获取目标元素

            let tmp = this.volume;

            this.volume = parseInt(parseInt(tar.offsetLeft) / 12 + 1);

            let dom = this.$refs['j-volume-bar'].getElementsByClassName('j-volume');

            for (let i = 0; i < dom.length; i++) {

                dom[i].removeAttribute('actived');

                if (parseInt(dom[i].getAttribute('seq')) + 1 <= this.volume) {
                    dom[i].setAttribute('actived', 'true');
                }

            }

            let flag = false;

            tar.onmousedown = (e) => {
                flag = true;
            };

            tar.onmouseout = (e) => {
                if (!flag) {
                    this.volume = tmp;
                }

                for (let i = 0; i < dom.length; i++) {

                    dom[i].removeAttribute('actived');

                    if (parseInt(dom[i].getAttribute('seq')) + 1 <= this.volume) {
                        dom[i].setAttribute('actived', 'true');
                    }

                }
            };

        },

        adjustPage: function (e) {

        },

        messageHide: function (e) {

            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            let elem = this.$refs['j-message-bar'];
            let pos = { x:200, y: 150 };
            let tweenA = new TWEEN.Tween(pos)
                .to({ x: 40 }, 300)
                .easing(TWEEN.Easing.Cubic.In)
                .onUpdate(function() {
                    elem.style.width = pos.x +'px';
                })
                .start();

            let tweenB = new TWEEN.Tween(pos)
                .to({ y: 25 }, 300)
                .easing(TWEEN.Easing.Cubic.In)
                .onUpdate(function() {
                    elem.style.bottom = pos.y +'px';
                });

            tweenA.chain(tweenB);

            animate();

        },

        messageShow: function (e) {

            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            let elem = this.$refs['j-message-bar'];
            let pos = { x: 40, y: 25 };
            let tweenA = new TWEEN.Tween(pos)
                .to({ y: 150 }, 300)
                .easing(TWEEN.Easing.Cubic.Out)
                .onUpdate(function() {
                    elem.style.bottom = pos.y +'px';
                })
                .start();

            let tweenB = new TWEEN.Tween(pos)
                .to({ x: 200 }, 300)
                .easing(TWEEN.Easing.Cubic.Out)
                .onUpdate(function() {
                    elem.style.width = pos.x +'px';
                });


            tweenA.chain(tweenB);

            animate();

        },

        searchFocus: function (e) {
            this.$refs['j-right'].style.right="0";
        },

        searchBlur: function (e) {
            let elem = this.$refs['j-right'];
            if (elem.getAttribute("over") == "false"){
                elem.style.right="-333px";
            } else {
                this.$refs['j-search'].focus();
            }
        },

        rightIn: function (e) {
            let elem = this.$refs['j-right'];
            elem.setAttribute("over", "true");
        },

        rightOut: function (e) {
            let elem = this.$refs['j-right'];
            elem.setAttribute("over", "false");
        },

        toggle: function (e) {

            let seq = parseInt(e.target.getAttribute('seq'));

            let dom = this.$refs['j-card-wrap'].getElementsByClassName('j-card-tab');
            let ld;
            let rd;

            for (let i = 0; i < dom.length; i++) {

                dom[i].removeAttribute('style');

                if ((seq === 0 ? this.cardList.length - 1 : seq - 1) === parseInt(dom[i].getAttribute('seq'))) {
                    ld = dom[i];
                }

                if ((seq === this.cardList.length - 1 ? 0 : seq + 1) === parseInt(dom[i].getAttribute('seq'))) {
                    rd = dom[i];
                }
            }

            if (seq > this.current) {

                ld.style.zIndex = '8';
                rd.style.zIndex = '7';

            } else {
                ld.style.zIndex = '7';
                rd.style.zIndex = '8';
            }

            this.current = seq;
            // this.current = 4;
        },

        shuffle: function () {
            this.cardList = _.shuffle(this.cardList)
        }

    }
});


