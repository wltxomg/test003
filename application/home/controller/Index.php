<?php
/**
 * +----------------------------------------------------------------------
 * | 首页控制器
 * +----------------------------------------------------------------------
 *                      .::::.
 *                    .::::::::.            | AUTHOR: siyu
 *                    :::::::::::           | EMAIL: 407593529@qq.com
 *                 ..:::::::::::'           | QQ: 407593529
 *             '::::::::::::'               | WECHAT: zhaoyingjie4125
 *                .::::::::::               | DATETIME: 2019/03/28
 *           '::::::::::::::..
 *                ..::::::::::::.
 *              ``::::::::::::::::
 *               ::::``:::::::::'        .:::.
 *              ::::'   ':::::'       .::::::::.
 *            .::::'      ::::     .:::::::'::::.
 *           .:::'       :::::  .:::::::::' ':::::.
 *          .::'        :::::.:::::::::'      ':::::.
 *         .::'         ::::::::::::::'         ``::::.
 *     ...:::           ::::::::::::'              ``::.
 *   ```` ':.          ':::::::::'                  ::::..
 *                      '.:::::'                    ':'````..
 * +----------------------------------------------------------------------
 */
namespace app\home\controller;
use app\common\model\System;
use think\Db;
use think\facade\Request;
use think\captcha\Captcha;


class Index extends Base
{
    public function initialize()
    {
        parent::initialize();
        //当前模块
        $this->module = strtolower(Request::module());
    }
    //首页
    public function index()
    {
        //测试插件
        //hook('test', ['id'=>2]);
        $system = System::where('id',1)->find();
        //后台开启手机端的时候自动跳转
        if($system['mobile']=='1'){
            if(isMobile()){
                $this->redirect('mobile/index/index');
            }
        }
        $this->view->assign('cate', null);//
        $this->view->assign('system', $system);//系统信息
        $this->view->assign('public', '/template/'.$this->module.'/'.$system['template'].'/');//公共目录
        $this->view->assign('title', $system['title']);//seo信息
        $this->view->assign('keywords', $system['key']);//seo信息
        $this->view->assign('description', $system['des']);//seo信息
        $template='./template/'.$this->module.'/'.$system['template'].'/'.$system['html'].'/index.html';
        return $this->view->fetch($template);
    }

    //类型列表
    public function typeList()
    {
        $system = System::where('id',1)->find();
        $this->view->assign('cate', null);//
        $this->view->assign('system', $system);//系统信息
        $this->view->assign('public', '/template/'.$this->module.'/'.$system['template'].'/');//公共目录
        $this->view->assign('title', $system['title']);//seo信息
        $this->view->assign('keywords', $system['key']);//seo信息
        $this->view->assign('description', $system['des']);//seo信息
        $template='./template/'.$this->module.'/'.$system['template'].'/'.$system['html'].'/type.html';
        return $this->view->fetch($template);
    }

    //搜索
    public function search(){
        $search = Request::param('search');//关键字
        if(empty($search)){
            $this->error('请输入关键词');
        }
        $this->view->assign('search', $search);

        $system = System::where('id',1)->find();
        $this->view->assign('cate', null);//
        $this->view->assign('system', $system);//系统信息
        $this->view->assign('public', '/template/'.$this->module.'/'.$system['template'].'/');//公共目录
        $this->view->assign('title', $system['title']);//seo信息
        $this->view->assign('keywords', $system['key']);//seo信息
        $this->view->assign('description', $system['des']);//seo信息
        $template='./template/'.$this->module.'/'.$system['template'].'/'.$system['html'].'/search.html';
        return $this->view->fetch($template);
    }

    public function getNews()
    {
        file_put_contents('./getNews.txt', date('Y-m-d H:i:s') . chr(10), FILE_APPEND);
        print_r(input(''));
    }

    public function getList()
    {
        $start = Request::param('start');
        $size  = Request::param('size');
        $type  = Request::param('type');
        $date  = Request::param('date');
        $start = $start ?: 10;
        $size  = $size ?: 10;
        $type  = $type ?: '';
        $date  = $date ? 1 : '';
        $order = 'id desc';
        $where[] = ['status', '=', 1];
        switch ($type) {
            case 'hits':
                $order = 'hits desc';
                break;

            case 'star':
                $where[] = ['star', '>', 3];
                break;

            default:
                break;
        }
        $article_obj = Db::name('article');
        $list = [];
        if ($date) {
            $list = $article_obj
                ->where($where)
                ->limit($start, $size)
                ->field(['id', 'catid', 'title', 'create_time', 'image', 'hits', 'summary'])
                ->order($order)
                ->whereTime('create_time', 'today')
                ->select();
        } else {
            $list = $article_obj
                ->where($where)
                ->limit($start, $size)
                ->field(['id', 'catid', 'title', 'create_time', 'image', 'hits', 'summary'])
                ->order($order)
                ->select();
        }

        foreach ($list as $key => $value) {
            $list[$key]['url']         = getShowUrl(['catid' => $value['catid'], 'id' => $value['id']]);
            $list[$key]['create_time'] = date('Y-m-d', $value['create_time']);
            unset($list[$key]['catid']);
        }
        return json(['list' => $list]);
    }

}
