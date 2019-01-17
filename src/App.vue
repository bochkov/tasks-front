<template>
  <el-container class="ui container">
    <el-header>
      <h2>
        <i class="send outline icon"></i> All Tasks
      </h2>
    </el-header>
    <el-main>
      <el-collapse accordion>
        <el-collapse-item v-for="(task, index) in tasks" :key="index">
          <template slot="title">
            <div class="title">
              <table class="ui table" :class="[task.registered ? 'green': 'red']">
                <tr>
                  <td class="eight wide">{{ task.vars.name }}</td>
                  <td class="four wide" v-if="task.vars.checked">
                    {{ task.vars.checked|moment("HH:mm:ss") }}
                    <br>
                    {{ task.vars.checked|moment("D MMMM YYYY")|lower }}
                  </td>
                  <td class="four wide"></td>
                </tr>
              </table>
            </div>
          </template>
          <Task :task="task"/>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import Task from "./components/Task.vue";

const axi = axios.create({
  baseURL: "http://127.0.0.1:8088"
});

export default {
  name: "app",
  components: {
    Task
  },
  created: function() {
    axi.get("/api/tasks").then(data => (this.tasks = data.data));
  },
  data() {
    return {
      tasks: []
    };
  }
};
</script>

<style>
</style>
