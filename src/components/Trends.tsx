import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { typeContext } from './DashboardBox';
import { fetchData } from '../utils/fetch';
import {IndTypes} from './static';

const trendData = [
  {'idNews':1,'industryType':'AI','title':'单一ViT模型执行多模态多任务，谷歌用协同训练策略实现多个SOTA','source':'https://www.jiqizhixin.com/articles/2021-12-21-13','time':'2021/12/21'},
  {'idNews':2,'industryType':'AI','title':'钟南山团队、腾讯联合研究：AI模型评估这三项措施最有助于防控疫情','source':'https://www.jiqizhixin.com/articles/2021-12-21-12','time':'2021/12/21'},
  {'idNews':3,'industryType':'AI','title':'最大数据集、多任务覆盖，阿里达摩院发布首个大规模中文多模态评测基准MUGE','source':'https://www.jiqizhixin.com/articles/2021-12-21-11','time':'2021/12/21'},
  {'idNews':4,'industryType':'AI','title':'超参数调优河伯、组合优化器CompBO，华为诺亚开源贝叶斯优化库','source':'https://www.jiqizhixin.com/articles/2021-12-20-3','time':'2021/12/20'},
  {'idNews':5,'industryType':'AI','title':'AAAI 2022 | 浙大提出KCL: 化学元素知识图谱指导下的分子图对比学习','source':'https://www.jiqizhixin.com/articles/2021-12-19-6','time':'2021/12/19'},
  {'idNews':6,'industryType':'AI','title':'陈天奇高赞文章：新一代深度学习编译技术变革和展望','source':'https://www.jiqizhixin.com/articles/2021-12-19-5','time':'2021/12/19'},
  {'idNews':7,'industryType':'AI','title':'几分钟让小孩的人物涂鸦「动起来」，Meta AI创建了一个奇妙的火柴人世界','source':'https://www.jiqizhixin.com/articles/2021-12-19-4','time':'2021/12/19'},
  {'idNews':8,'industryType':'AI','title':'计算机视觉领军学者沈春华归国，已加入浙江大学','source':'https://www.jiqizhixin.com/articles/2021-12-19-2','time':'2021/12/19'},
  {'idNews':9,'industryType':'AI','title':'何恺明的ResNet论文，被引量刚刚突破10万大关','source':'https://www.jiqizhixin.com/articles/2021-12-19','time':'2021/12/19'},
  {'idNews':10,'industryType':'AI','title':'从武汉模式走向中国模式，打造人工智能产业发展的「中国样板」','source':'https://www.jiqizhixin.com/articles/2021-12-18-2','time':'2021/12/18'},
  {'idNews':11,'industryType':'AI','title':'OpenAI教GPT-3学会上网，「全知全能」的AI模型上线了','source':'https://www.jiqizhixin.com/articles/2021-12-17-9','time':'2021/12/17'},
  {'idNews':12,'industryType':'AI','title':'这家公司做AI技术，把焦点放在了「人」身上','source':'https://www.jiqizhixin.com/articles/2021-12-17-7','time':'2021/12/17'},
  {'idNews':13,'industryType':'AI','title':'AI预测蛋白质结构登上Science、Nature年度技术突破，AI for Science潜力无穷','source':'https://www.jiqizhixin.com/articles/2021-12-17-6','time':'2021/12/17'},
  {'idNews':14,'industryType':'AI','title':'中科院自动化所联合北方电子设备研究所提出多输入文本人脸合成方法，数据代码已开源','source':'https://www.jiqizhixin.com/articles/2021-12-17-4','time':'2021/12/17'},
  {'idNews':15,'industryType':'AI','title':'大淘宝技术提出TTNet算法，荣获“最佳工业论文奖”奖项','source':'https://www.jiqizhixin.com/articles/2021-12-16-19','time':'2021/12/16'}
];

const dataMap = (data: any) => {
  return data.map((item, index) => {
    return (
      <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/xxxxx/1.jpg" />
          </ListItemAvatar>

          <ListItemText
            primary={
              <React.Fragment>
                <Link href={item.source} > {item.title} </ Link>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.time}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  });
};


const Trends = () => {

  const initData = [];
  const [dispData, setDispData] = React.useState(initData);
  const [allData, setAllData] = React.useState(initData);
  const type = React.useContext(typeContext);
  
  React.useEffect(() => {
    (async () => {
      try {
        setDispData(await fetchData('/news', {industryType: IndTypes[type].name}));
        setAllData(await fetchData('/news', {industryType: IndTypes[type].name}));
      } catch (e) {
        //TODO: handle exception
      }
    })();
  }, []);

  const updData = (e) => {
    const _input = e.target.value;
    const newData = allData
      .filter((item) => {
        return item.title.includes(_input);
      });
    setDispData(newData);
  };

  return (
    <> 
      <TextField id="outlined-search" label="Search field" type="search" onChange={(e) =>{updData(e);}}/>
      <List sx={{ width: '100%', maxHeight: 600, overflow: 'auto', bgcolor: 'background.paper' }}>
        {dataMap(dispData)}
      </List>
    </>
  );
};

export default Trends;