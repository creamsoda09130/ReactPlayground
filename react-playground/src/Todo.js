import './Todo.css';
import Heading from './component/heading';

function TodoItem({ title, contents, isDone }) {
  function toggleCheck(e) {
    let target = e.target;
    if (e.target.tagName !== 'LI') {
      target = e.target.closest('.todo-list-item');
    }
    target.classList.toggle('todo-list-item--checked');
    const checkbox = target.querySelector('.todo-check');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  }

  return (
    <li className={`todo-list-item ${isDone ? 'todo-list-item--checked' : ''}`} onClick={toggleCheck}>
      <input className="todo-check" type="checkbox" name="isDone" defaultChecked={isDone} />
      <div className="todo-contents">
        <p className="todo-title">{title}</p>
        <p className="todo-detail" dangerouslySetInnerHTML={{ __html: contents }}></p>
      </div>
    </li>
  );
}

function TodoList() {
  const todos = [
    {
      title: '寝る',
      contents: '寝るのは健康に良いので寝る<br />※ 寝る時のポケスリ計測を忘れずに',
      isDone: false,
    },
    {
      title: '連絡',
      contents: 'Aさんの返事返す',
      isDone: true,
    },
    {
      title: '旅行',
      contents: 'いつか行きたい',
      isDone: false,
    },
  ];

  document.title = 'TODOリスト作ってみた';
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem key={index} title={todo.title} contents={todo.contents} isDone={todo.isDone} />
      ))}
    </ul>
  );
}

export default function Todo() {
  return (
    <>
      <Heading text="TODOリスト" />
      <div className="todo">
        <h2>やること一覧</h2>
        <TodoList />
      </div>
    </>
  );
}
