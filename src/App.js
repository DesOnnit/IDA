import { useState } from 'react';
import './App.css';
import {Catalog} from './components/Catalog/Catalog';
import {Form} from './components/Form/Form';
import { Modal } from './components/Modal/Modal';

function App() {
  const [visible,setVisible] = useState(false)

  return (
    <div className="App">
      <div className="App__content">
        <Form
        setVisible={setVisible} />
        <Catalog />
        <Modal
        visible={visible}/>
      </div>
    </div>
  );
}

export default App;
