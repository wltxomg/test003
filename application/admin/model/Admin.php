<?php
namespace app\admin\model;

class Admin extends Base {
    public function checkLogin()
    {
        $username = input("post.username");
        $password = input("post.password");

        $open_code = db('system')->where('id',1)->value('code');
        if ($open_code){
            $code = input("post.vercode");
            if( !captcha_check($code ))
            {
                $data = ['status' => '0', 'msg' => '验证码错误'];
                return json($data);
            }
        }
        $result = $this->where(['username'=>$username,'password'=>md5($password)])->find();
        if(empty($result)){
            $data = ['status' => '0', 'msg' => '帐号或密码错误'];
            return json($data);
        }else{
            if ($result['status']==1){
                session('admin', $result);

                //更新登录IP和登录时间
                $this->where('id', $result['id'])->update(['logintime' => time(),'loginip'=>request()->ip()]);

                $rules = db('auth_group_access')
                    ->alias('a')
                    ->leftJoin('auth_group ag','a.group_id = ag.id')
                    ->field('a.group_id,ag.rules,ag.title')
                    ->where('uid',$result['id'])
                    ->find();
                session('admin.group_id', $rules['group_id']);
                session('admin.rules'   , explode(',',$rules['rules']));
                session('admin.title'   , $rules['title']);
                $data = ['status' => '1','href' => url('Index/index'), 'msg' => '登录成功'];
                return json($data);
            }else{
                return ['code' => 0, 'msg' => '用户已被禁用!'];
            }

        }
        //登录成功

    }
}