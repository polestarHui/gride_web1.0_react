import React from 'react';
import style from './style.less';
import moment from 'moment';
import { Dropdown, Menu, Layout } from 'antd';
import { Loading } from '../framework/tools/ajax';
import companylogoWhite from '../assets/logo/companylogo-white.png';
import bg from '../assets/detail/loginBg.png'
import user from '../assets/detail/user.png'
import pass from '../assets/detail/pass.png'
import $ from  'jquery'
import router from 'umi/router';







const { Header } = Layout;



export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false,
      date: moment().format('YYYY.MM.DD'),
    };
    // TODO fix
    document.title = '网格化管理';
  }

  componentDidMount() {
  }


  componentWillUnmount() {
    try {
      clearInterval(this.timer);
    } catch (e) {
      console.error(e);
    }
  }
  //登录
  goLogin(e){
    //获取输入的账号和密码
    const root=$('#userNum').val();
    const paw = $('#pas').val()
    if((root=='root')&&(paw=='123456')){
      localStorage.setItem('isLogin',1);
      history.go(0);
    }else{
      alert('请输入正确的账号或密码')
    }
  }
  //退出登录
  logOut(){
    router.push('/map/run');
    //  清除缓存的网格编号
    localStorage.clear();
    history.go(0);
  }


  render() {
    let { location, children } = this.props;
    if (location.pathname === '/test' || location.pathname === '/login') {
      console.log(children);
      return children;
    }

    return (
      <div>
        {!localStorage.getItem('isLogin')?
          <div className={style.logoinWrap}>
            <img src={bg} alt="背景图" className={style.bg}/>
            <div className={style.title}>基于网格化安全监管</div>
            <div className={style.msgWrap}>
              <div className={style.userTitle}>用户登录</div>
              <div className={style.everyOne}>
                <img src={user} alt="用户"/>
                <input id='userNum'  type="text" placeholder="请输入你的账号"/>
              </div>
              <div className={style.everyOne}>
                <img src={pass} alt="密码"/>
                <input id='pas' type="password" placeholder="请输入你的密码"/>
              </div>
              <div className={style.loginBtn} onClick={this.goLogin.bind(this)}>登录</div>
            </div>
            <div className={style.companyName}>水木联合科技有限公司</div>
            <a href='http://www.tangmix.com/' target={'_blank'}>www.tangmix.com</a>
          </div>
          :
          <div className={style.layout}>
            <Header className={style.header}>
              <a className={style.logo} href={'http://www.tangmix.com'} target={'_blank'}>
                <img src={companylogoWhite} alt={'logo'}/>
              </a>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">基层网格化监管</Menu.Item>
                {/*<Menu.Item key="2">智能软检测</Menu.Item>*/}
              </Menu>
              <div style={{width:100,position:'absolute',color:'#fff',top:0,right:20,cursor:'pointer'}} onClick={this.logOut.bind(this)}>退出登录</div>
            </Header>
            <div className={style.children}>
              <Loading />
              {children}
            </div>

          </div>
        }
      </div>
    );
  }
}

