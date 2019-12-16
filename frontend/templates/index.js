
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
            let tmp = Math.floor(this.$refs['j-audio'].duration);
            this.duration = this.cont(tmp, 'mm:ss');
        },
        getCurrentTime: function () {
            let tmp = Math.floor(this.$refs['j-audio'].currentTime);
            if (tmp >= 1){
                this.currentTime = this.cont(tmp,'mm:ss');
            }

            console.log("currentTime:" + this.currentTime + "\t" + "duration:" + this.duration)

            if (this.currentTime === this.duration){
                this.played = false;
                this.$refs['j-audio'].pause();
            }
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
        }
    }
});