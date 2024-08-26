const drawList = (data, containerId) => {
  const task = document.querySelector(`#${containerId} ul`);
  task.innerHTML = "";

  data[containerId].forEach((item) => {
    task.innerHTML += `
    <li class="container-item" id=${item.id}>
               <p>Task: ${item.title}</p>
               <div class="buttons">
               ${
                 containerId !== "deleted"
                   ? `<button class="button edit">&#10003;</button>
               <button class="button deleted">&#128465</button>
               <button class="button next">	&#8658</button>`
                   : `<button class="button restore">restore</button>`
               }    
               
               </div>
           </li>`;
  });
};

const nextTask = (event, data, containerId) => {
  const id = event.target.closest(".container-item").id;
  const item = data[containerId].find((item) => item.id === +id);

  data[containerId] = data[containerId].filter((item) => item.id !== +id);

  if (containerId === "task") {
    data.inProgress.push(item);
  } else if (containerId === "inProgress") {
    data.done.push(item);
  } else {
    data.deleted.push(item);
  }

  drawList(data, containerId);
  drawList(
    data,
    containerId === "task"
      ? "inProgress"
      : containerId === "inProgress"
      ? "done"
      : "deleted"
  );
};

const init = () => {
  let data = {
    task: [],
    inProgress: [],
    done: [],
    deleted: [],
  };

  const task = document.querySelector("#task");
  const deleted = document.querySelector("#deleted");
  const inProgress = document.querySelector("#inProgress");
  const done = document.querySelector("#done");

  task.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-plus")) {
      event.preventDefault();
      task.querySelector(".container-form").classList.toggle("form-hidden");
    }


    // ////отрисовка
  
    if (event.target.classList.contains("button-add")) {
      event.preventDefault();
      const title = task.querySelector(`#task-title`);
    
      data.task.push({
        id: Date.now(),
        title: title.value,
      });
    
      task.querySelector(".container-form").classList.toggle("form-hidden");
    
      drawList(data, "task");
    };
    


    /////////фунция удаления

    if (event.target.classList.contains("deleted")) {
      event.preventDefault();
      const id = event.target.closest(".container-item").id;

      const item = data.task.find((item) => item.id === +id);

      data.task = data.task.filter((item) => item.id !== +id);
      data.deleted.push(item);

      drawList(data, "task");
      drawList(data, "deleted");
    }
    if (event.target.classList.contains("next")) {
      nextTask(event, data, "task");
    }


      /////////функция редактирования
    if (event.target.classList.contains("edit")) {
      event.preventDefault();
      const containerItem = event.target.closest(".container-item");

      if (containerItem.querySelector(".edit-form")) {
        containerItem.querySelector(".edit-form").remove();
        return;
      }

      const id = containerItem.id;

      const item = data.task.find((item) => item.id === +id);

      containerItem.insertAdjacentHTML(
        "beforeend",
        `<form class="edit-form">
        <input type="text" name="title" value="${item.title}">
        <button class="button save">Save</button>
        </form>`
      );
    }
/////////фунция сохранения
    if (event.target.classList.contains("save")) {
      event.preventDefault();
      const containerItem = event.target.closest(".container-item");
      const containerItemId = containerItem.id;

      const item = data.task.find((item) => item.id === +containerItemId);
      const itemIndex = data.task.findIndex(
        (item) => item.id === +containerItemId
      );

      const title = containerItem.querySelector(`input[name="title"]`);

      data.task.splice(itemIndex, 1, {
        ...item,
        title: title.value,
      });

      containerItem.querySelector(".edit-form").remove();
      drawList(data, "task");
    }
  });




  inProgress.addEventListener("click", (event) => {
    if (event.target.classList.contains(".task-plus")) {
      event.preventDefault();
      inProgress.querySelector(".container-form").classList.toggle("form-hidden");
    }

     ////отрисовка
  
      if (event.target.classList.contains("button-add")) {
        event.preventDefault();
        const title = inProgress.querySelector(`#inProgress-title`);
      
        data.inProgress.push({
          id: Date.now(),
          title: title.value,
        });
      
        inProgress.querySelector(".container-form").classList.toggle("form-hidden");
      
        drawList(data, "inProgress");
      };
        

    /////////фунция удаления
    if (event.target.classList.contains("deleted")) {
      event.preventDefault();
      const id = event.target.closest(".container-item").id;

      const item = data.inProgress.find((item) => item.id === +id);

      data.inProgress = data.inProgress.filter((item) => item.id !== +id);
      data.deleted.push(item);

      drawList(data, "inProgress");
      drawList(data, "deleted");
    }

    if (event.target.classList.contains("next")) {
      event.preventDefault();
      nextTask(event, data, "inProgress");
    }


      /////////функция редактирования
    if (event.target.classList.contains("edit")) {
      event.preventDefault();
      const containerItem = event.target.closest(".container-item");

      if (containerItem.querySelector(".edit-form")) {
        containerItem.querySelector(".edit-form").remove();
        return;
      }

      const id = containerItem.id;

      const item = data.inProgress.find((item) => item.id === +id);

      containerItem.insertAdjacentHTML(
        "beforeend",
        `<form class="edit-form">
        <input type="text" name="title" value="${item.title}">
        <button class="button save">Save</button>
        </form>`
      );
    }
 /////////фунция сохранения
    if (event.target.classList.contains("save")) {
      event.preventDefault();
      const containerItem = event.target.closest(".container-item");
      const containerItemId = containerItem.id;

      const item = data.inProgress.find((item) => item.id === +containerItemId);
      const itemIndex = data.inProgress.findIndex(
        (item) => item.id === +containerItemId
      );

      const title = containerItem.querySelector(`input[name="title"]`);
      const description = containerItem.querySelector(
        `input[name="description"]`
      );

      data.inProgress.splice(itemIndex, 1, {
        ...item,
        title: title.value,
      });

      containerItem.querySelector(".edit-form").remove();
      drawList(data, "inProgress");
    }
  });





  done.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-plus")) {
      event.preventDefault();
      done.querySelector(".container-form").classList.toggle("form-hidden");
    }


       // ////отрисовка
  
       if (event.target.classList.contains("button-add")) {
        event.preventDefault();
        const title = done.querySelector(`#done-title`);
      
        data.done.push({
          id: Date.now(),
          title: title.value,
        });
      
        done.querySelector(".container-form").classList.toggle("form-hidden");
      
        drawList(data, "done");
      };

    /////////фунция удаления
    if (event.target.classList.contains("deleted")) {
      event.preventDefault();
      const id = event.target.closest(".container-item").id;
      const item = data.done.find((item) => item.id === +id);

      data.done = data.done.filter((item) => item.id !== +id);
      data.deleted.push(item);

      drawList(data, "done");
      drawList(data, "deleted");
    }
    if (event.target.classList.contains("next")) {
      nextTask(event, data, "done");
    }

    /////////функция редактирования
    if (event.target.classList.contains("edit")) {
      event.preventDefault();
      const containerItem = event.target.closest(".container-item");

      if (containerItem.querySelector(".edit-form")) {
        containerItem.querySelector(".edit-form").remove();
        return;
      }

      const id = containerItem.id;

      const item = data.done.find((item) => item.id === +id);

      containerItem.insertAdjacentHTML(
        "beforeend",
        `<form class="edit-form">
        <input type="text" name="title" value="${item.title}">
        <button class="button save">Save</button>
        </form>`
      );
    }
/////////фунция сохранения
    if (event.target.classList.contains("save")) {
      event.preventDefault();
      const containerItem = event.target.closest(".container-item");
      const containerItemId = containerItem.id;

      const item = data.done.find((item) => item.id === +containerItemId);
      const itemIndex = data.done.findIndex(
        (item) => item.id === +containerItemId
      );

      const title = containerItem.querySelector(`input[name="title"]`);
      const description = containerItem.querySelector(
        `input[name="description"]`
      );

      data.done.splice(itemIndex, 1, {
        ...item,
        title: title.value,
      });

      containerItem.querySelector(".edit-form").remove();
      drawList(data, "done");
    }
  });

  
  /////// восстановление

  deleted.addEventListener("click", (event) => {
    if (event.target.classList.contains("restore")) {
      event.preventDefault();
      const id = event.target.closest(".container-item").id;

      const item = data.deleted.find((item) => item.id === +id);

      data.deleted = data.deleted.filter((item) => item.id !== +id);
      data.task.push(item);

      drawList(data, "task");
      drawList(data, "deleted");
    }
  });
};
init();
