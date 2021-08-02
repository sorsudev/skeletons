import actions from '../redux/actions/dataActions'
import { connect } from 'react-redux';
import AccordionItem from "./accordion_item";

const Datas = (props) => {
  return (
    <div className="accordion" id="jsonDatas">
      {props.keys.map((keyName, key) =>{
        let dataObject = props.data[keyName];
        let head = keyName.replace(/_/g,' ');
        return (
          <AccordionItem key={key} head={head} body={dataObject.body} index={dataObject.index} parentId='jsonDatas' />
        ) 
      })}
    </div>
  );
}


const mapStateToProps = state => {
  return {
    data: state.mainData.data,
    keys: Object.keys(state.mainData.data)
  }
};
 
export default connect(mapStateToProps, actions)(Datas);