import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const policyData = [
    {"idPolicy":1,"industryType":"AI","title":"科技部关于支持哈尔滨建设国家新一代人工智能创新发展试验区的函 ","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/qtwj/qtwj2021/202112/t20211207_178440.html","time":"2021/12/7"},
    {"idPolicy":2,"industryType":"AI","title":"科技部关于支持沈阳建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/qtwj/qtwj2021/202112/t20211207_178439.html","time":"2021/12/7"},
    {"idPolicy":3,"industryType":"AI","title":"科技部关于支持郑州建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/qtwj/qtwj2021/202112/t20211207_178438.html","time":"2021/12/7"},
    {"idPolicy":4,"industryType":"AI","title":"科技部关于支持郑州建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/qtwj/qtwj2021/202112/t20211207_178438.html","time":"2021/12/7"},
    {"idPolicy":5,"industryType":"AI","title":"教育部关于实施第二批人工智能助推教师队伍建设行动试点工作的通知","organization":"中华人民共和国教育部","source":"http://www.moe.gov.cn/srcsite/A10/s7034/202109/t20210915_563278.html","time":"2021/9/15"},
    {"idPolicy":6,"industryType":"AI","title":"交通运输部科技司关于做好科技创新2030—“新一代人工智能”重大项目2021年度项目申报工作的通知","organization":"科技司","source":"https://xxgk.mot.gov.cn/2020/jigou/kjs/202107/t20210716_3612025.html","time":"2021/7/16"},
    {"idPolicy":7,"industryType":"AI","title":"教育部办公厅关于开展第二批人工智能助推教师队伍建设试点推荐遴选工作的通知","organization":"教育部办公厅","source":"http://www.moe.gov.cn/srcsite/A10/s7034/202104/t20210423_527853.html","time":"2021/4/23"},
    {"idPolicy":8,"industryType":"AI","title":"科技部关于支持长沙市建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.gov.cn/zhengce/zhengceku/2021-03/25/content_5595552.htm","time":"2021/3/19"},
    {"idPolicy":9,"industryType":"AI","title":"科技部关于支持苏州市建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.gov.cn/zhengce/zhengceku/2021-03/25/content_5595549.htm","time":"2021/3/19"},
    {"idPolicy":10,"industryType":"AI","title":"北京市人力资源和社会保障局关于印发《北京市工程技术系列(人工智能)专业技术资格评价试行办法》的通知","organization":"北京市人力资源和社会保障局","source":"http://www.beijing.gov.cn/zhengce/zhengcefagui/202011/t20201107_2130654.html","time":"2020/11/6"},
    {"idPolicy":11,"industryType":"AI","title":"科技部关于印发《国家新一代人工智能创新发展试验区建设工作指引(修订版)》的通知","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/fgzc/gfxwj/gfxwj2020/202012/t20201224_171987.html","time":"2020/10/29"},
    {"idPolicy":12,"industryType":"AI","title":"科技部关于支持武汉市建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/qtwj/qtwj2020/202009/t20200904_158651.html","time":"2020/9/4"},
    {"idPolicy":13,"industryType":"AI","title":"科技部关于支持广州市建设国家新一代人工智能创新发展试验区的函","organization":"科技部","source":"http://www.most.gov.cn/xxgk/xinxifenlei/fdzdgknr/qtwj/qtwj2020/202009/t20200904_158650.html","time":"2020/9/4"},
    {"idPolicy":14,"industryType":"AI","title":"天津市人民政府办公厅关于印发天津市建设国家新一代人工智能创新发展试验区行动计划的通知","organization":"天津市人民政府办公厅","source":"http://www.tj.gov.cn/zwgk/szfwj/tjsrmzfbgt/202008/t20200827_3571260.html","time":"2020/9/4"},
    {"idPolicy":15,"industryType":"AI","title":"省人民政府关于印发湖北省新一代人工智能发展总体规划(2020—2030年)的通知","organization":"湖北省人民政府","source":"http://www.hubei.gov.cn/zfwj/ezf/202009/t20200904_2887689.shtml","time":"2020/8/25"}
];


const Policy = () => {
    const listItems = policyData.map((item, index) => {
      return (
        <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/xxxxx/1.jpg" />
          </ListItemAvatar>
  
          <ListItemText
            primary={item.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.source}
                  <br/>
                </Typography>
                
                {item.time}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
      );
    })
  
    return (
  
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {listItems}
      </List>
    );
  }
  
  export default Policy;