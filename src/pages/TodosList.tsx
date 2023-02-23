import { fetchTodos, selectTodos } from "../features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { todoType } from "../helpers/constants";

const TodosList = ()=>{
    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos)
    const loadingStatus = useAppSelector(state=> state.todos.status.fetch)
    useEffect(()=>{
        dispatch(fetchTodos());
    },[])
    return (
        <div className="container ">
           <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {todos.map((todo:todoType) => (
                        <tr key={todo.id.toString()}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(loadingStatus === 'pending') &&
             <div className="d-flex justify-content-center"><div className="spinner-border"></div></div>
            }
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem illo aliquam quia vitae nostrum sequi sed neque consequuntur aspernatur. Ea, mollitia! Tempore perspiciatis dolor necessitatibus debitis explicabo eveniet laboriosam. Praesentium. */}
        </div>
    );
}
export default TodosList;