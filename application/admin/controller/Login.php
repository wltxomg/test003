<?php
/**
 * +----------------------------------------------------------------------
 * | 登录制器
 * +----------------------------------------------------------------------
 *                      .::::.
 *                    .::::::::.            | AUTHOR: siyu
 *                    :::::::::::           | EMAIL: 407593529@qq.com
 *                 ..:::::::::::'           | QQ: 407593529
 *             '::::::::::::'               | WECHAT: zhaoyingjie4125
 *                .::::::::::               | DATETIME: 2019/03/027
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
namespace app\admin\controller;
use app\common\model\System;
use think\Controller;
use app\admin\model\Admin;
use think\captcha\Captcha;
use think\facade\Session;

class Login extends Controller
{
    //登录页面
    public function index()
    {
        //判断是否为手机端
        $mobile = isMobile();
        $this->assign('mobile', $mobile);

        $system = System::find(1);
        $this->view->assign('system', $system);
        return $this->view->fetch();
    }

    //校验登录
    public function checkLogin(){
        $m = new Admin();
        return $m->checkLogin();
    }

    //验证码
    public function captcha(){
        $config =    [
            // 验证码字体大小
            'fontSize'    =>    30,
            // 验证码位数
            'length'      =>    4,
            // 关闭验证码杂点
            'useNoise'    =>    true,
            // 是否画混淆曲线
            'useCurve' => false,
        ];
        $captcha = new Captcha($config);
        return $captcha->entry();
    }

    //退出登录
    public function logout(){
        Session::set('admin',null);
        $this->redirect('admin/login/index');
    }

}
