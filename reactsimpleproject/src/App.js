import React, {Component} from 'react';
import axios from 'axios'
import './App.css'
//定义组件
class App extends Component {
//初始化状态
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      name:''
    }
  }

  render() {
    console.log(1234)
    return (
        <div className="container-fluid" style={{marginTop: '20px'}}>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-1">
              <table className="table table-bordered">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                  !!this.state.list && this.state.list.map(item=>{
                    return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>{this.setState({id:item.id,name:item.name})}}>修改</button>
                            <button className="btn btn-danger" style={{marginLeft:'5px'}} onClick={()=>{this.deleteItem(item)}}>删除</button>
                          </td>
                        </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
            <div className="col-xs-3 col-xs-offset-1">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="name" className="col-xs-3">用户名</label>
                  <div className="col-xs-8">
                    <input type="text" id="name" className="form-control" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
                  </div>

                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button className="btn btn-default" onClick={this.handleFormSubmit}>提交</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
    );
  }
//
  componentDidMount(){
    let self = this;
    setTimeout(function(){
      self.query();
    },5000)

  }

  query = () => {
    axios.get('/user').then(({data})=>{
      this.setState({
        list:data
      });
    })
  };
  deleteItem = (item) => {
    axios.delete(`/user/${item.id}`).then(({data})=>{
      console.log(data);
      let rowData = this.state.list;
      for(let i in rowData){
        let unit = rowData[i];
        if(unit.id === item.id){
          console.log("delte")
          delete rowData[i];
        }
      }
      this.setState({"list": rowData});
      //[{"id":5,"name":"ads"},{"id":6,"name":"as"},{"id":7,"name":"asdas"},{"id":8,"name":"as"},{"id":9,"name":"asdadzzz"},{"id":10,"name":"asd"},{"id":11,"name":"ad"},{"id":12,"name":"asda"},{"id":13,"name":"11"}]
    })
  };
//提交
  handleFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.name !== ''){
      axios.post('/user',{id:!this.state.id?'':this.state.id,name:this.state.name}).then(({data})=>{
        this.setState({
          id:'',
          name:''
        });
        this.query();
      })
    }
  }
}

export default App;
