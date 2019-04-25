// 音乐搜索接口
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接

// 必选参数 : keywords : 关键词

// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频

// 接口地址 : /search

// 调用例子 : /search?keywords= 海阔天空
import {MusicInfo} from "./MusicInfo";
import {Request} from "./Request";
export class MusicSearchHelper{
    // 固定值
    searchUrl:string = "https://music.163.com/api/search/pc/";
    
    // 设定值
    keyword:string;     // 搜索关键字
    limit:number=0;       // 每一页的最大数量，默认10

    // 运行时迭代值
    offset:number;      // 当前页码

    // 结果集
    result:Array<MusicInfo>=new Array<MusicInfo>();
    constructor(keyword:string,offset:number=0){
        this.offset = offset;
        this.keyword = keyword;
    }

    // /**
    //  * 对象解构构造
    //  * @param param0 对象
    //  */
    // public static buildByObject({keyword,offset,limit}):MusicSearchHelper{
    //     return new MusicSearchHelper(keyword,offset,limit);
    // }

    /**
     * 获取搜索结果
     */
    public async getSearchResult(){
        let searchData = `s=${this.keyword}&limit=${this.limit}&type=1&offset=${this.offset}`;
        let result = await Request.post(this.searchUrl,searchData);
        this.result = MusicInfo.buildByPostResult(result);
        return this.result;
    }

    /**
     * 上一页
     */
    public previousPage():MusicSearchHelper{
        if(this.limit>0){
            this.limit--;
        };
        return this;
    }

    /**
     * 下一页
     */
    public nextPage():MusicSearchHelper{
        this.limit++;
        return this;
    }

    /**
     * 获取当前页数
     */
    public getCurrentPage():number{
        return this.limit+1;
    }

    /**
     * 
     */
}