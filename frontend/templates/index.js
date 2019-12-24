
// 当前环境：b for broswer, c for client

const env = "b";

const ipcRenderer = env === 'c' ? require('electron').ipcRenderer : null;

let main = new Vue({
    el: "#main",
    data: {
        played: false,
        maximized: false,
        currentTime: "00:00",
        duration: "00:00",
        result: "测试",
        positionX: 0,
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
                "m+" : Math.floor(time / 60),
                "s+" : time % 60,
            };

            for(let k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;

        },
        getDuration: function () {
            let duration = Math.floor(this.$refs['j-audio'].duration);
            this.duration = this.cont(duration, 'mm:ss');
        },
        getCurrentTime: function () {
            let currentTime = Math.floor(this.$refs['j-audio'].currentTime);
            let duration = Math.floor(this.$refs['j-audio'].duration);

            if (currentTime >= 1){
                this.currentTime = this.cont(currentTime,'mm:ss');
            }

            let rate = currentTime / duration * 100;
            this.$refs['j-process-play'].style.width = rate + '%';

            if (this.currentTime === this.duration){
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
            let tar = e.target;        //获取目标元素

            let el = this.$refs['j-process-play'];

            //算出鼠标相对元素的位置
            let disX = e.clientX - el.offsetWidth;

            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;

                // 移动当前元素

                if (left < 0) {
                    left = 0;
                }else if (left >= this.$refs['j-process-bar'].offsetWidth){
                    left = this.$refs['j-process-bar'].offsetWidth;
                }

                let rate = left / this.$refs['j-process-bar'].offsetWidth * 100;

                this.$refs['j-process-bar'].height = '4px';
                el.style.width = rate + '%';
                this.setCurrentTime(Math.floor(rate * this.$refs['j-audio'].duration / 100) );

                // 防止选择内容
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            };

            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
});