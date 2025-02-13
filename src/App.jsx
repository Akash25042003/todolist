import React, { useState } from 'react'
import Header from './components/Header'
import Leftside from "./components/Leftside"
import Rightside from "./components/Rightside"
import { useEffect } from 'react'
import {motion} from "framer-motion"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaArrowUp, FaArrowDown, FaTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const[task,settask]=useState([]);
  const[deletedtask,setdeletedtask]=useState([])
  const[newtask,setnewtask]=useState([])
  const [isBottom, setIsBottom] = useState(false);



  const addtask = () => {
    if (newtask.trim() !== "") {
      let myobj={
        id:Date.now(),
        text:newtask,
        completed:false
      }
      settask([myobj,...task])
      setnewtask("");
    }
  };

  const toggleComplete = (id) => {
    console.log("change")
    settask((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks.sort((a, b) => a.completed - b.completed);
    });
  };

  const adddeleteditems=(id)=>{
    const deltask=task.find(tem=> tem.id === id)
    console.log(deltask)
    setdeletedtask([...deletedtask,deltask])
    settask(task.filter(temp=>temp.id!== id))
  }


  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        const isAtBottom =
          mainContent.scrollHeight - mainContent.scrollTop <= mainContent.clientHeight + 10;
        setIsBottom(isAtBottom);
      }
    };

    document.getElementById("main-content")?.addEventListener("scroll", handleScroll);
    return () => document.getElementById("main-content")?.removeEventListener("scroll", handleScroll);
  }, []);


  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...task];
      [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
      settask(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < task.length - 1) {
      const updatedTasks = [...task];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      settask(updatedTasks);
    }
  };


  return (
      <section className='flex flex-col h-screen'>
        <header className='bg-purple-900 text-white text-start p-4 font-extrabold text-2xl '><Header/></header>
        <article className="flex flex-1 overflow-hidden">
          <aside className="w-1/5 bg-gray-100 p-4 fixed h-full"><Leftside/></aside>
          <main id="main-content" className="flex-1 p-6 overflow-auto ml-[20%] mr-[20%]">
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <input type="text" className="border p-2 flex-grow rounded-md" placeholder="Enter a task"  name="task" value={newtask} onChange={(e) => setnewtask(e.target.value)}/>
              <button className="bg-violet-900 text-white   p-2 rounded-md w-full sm:w-auto  rounded-2xl" onClick={addtask}>add task</button>
            </div>
            <ul>
              {task.map((val,index)=>{
                return(
                  <motion.li key={val.id}
                  className='flex items-center justify-between p-2 border-b flex-col sm:flex-row gap-2 '
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`${val.completed ? "line-through text-gray-500" : ""}`}>
                    <input type="checkbox" className="mr-2" value={task.completed} onChange={()=>toggleComplete(val.id)}/>
                    <span className="flex-grow">{val.text}</span>
                    </div>
                    <div>
                      <button className='bg-green-700 text-white p-1 ml-2 font-medium rounded-lg text-[10px] sm:text-xs md:text-sm p-2' onClick={() => moveTaskUp(index)}><FontAwesomeIcon icon={faArrowUp} /></button>
                      <button className='bg-orange-500 text-white p-1 ml-2 font-medium rounded-lg text-[10px] sm:text-xs md:text-sm p-2' onClick={() => moveTaskDown(index)}><FontAwesomeIcon icon={faArrowDown} /></button>
                      <button className="bg-red-700 text-white p-1 ml-2 font-medium rounded-lg text-[10px] sm:text-xs md:text-sm p-2" onClick={()=>adddeleteditems(val.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </main>
          {deletedtask.length>0 && (<Rightside deletedtask={deletedtask} adddeleteditems={adddeleteditems}/>)}
        </article>
        {isBottom && <footer  className="bg-gray-950 text-white text-center p-4 mt-auto z-10">
          copyright akash@2025
        </footer>}
      </section>
  )
}

export default App