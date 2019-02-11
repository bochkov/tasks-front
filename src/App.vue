<template>
  <el-container>
    <el-header>
      <h2>
        <i class="fas fa-theater-masks"></i> All Tasks
      </h2>
    </el-header>
    <el-main>
      <el-collapse accordion>
        <el-collapse-item v-for="(task, index) in tasks" :key="index">
          <template slot="title">
            <table>
              <tr>
                <td>
                  <i
                    class="far"
                    :class="[task.registered ? 'fa-check-circle success': 'fa-times-circle fail']"
                  ></i>
                </td>
                <td class="col-title">{{ task.vars.name }}</td>
                <td class="col-date">
                  {{ task.vars.checked|moment("D MMMM YYYY")|lower }}
                </td>
                <td class="col-time">
                  {{ task.vars.checked|moment("HH:mm:ss") }}
                </td>
              </tr>
            </table>
          </template>
          <Task :task="task"/>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
import Task from "./components/Task.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    Task
  },
  created: function() {
    this.$bus.$on('fetchData', this.fetchData);
    this.fetchData();
  },
  destroyed: function() {
    this.$bus.$off('fetchData', this.fetchData);
  },
  methods: {
    fetchData: function() {
      axios.get("/api/tasks").then(data => (this.tasks = data.data));
    }
  },
  data() {
    return {
      tasks: []
    };
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", "sans-serif";
}
.el-container {
  padding-bottom: 5em;
}
.el-header {
  margin: 2em 0;
}
.success {
  font-size: 1.2em;
  color: green;
}
.fail {
  font-size: 1.2em;
  color: red;
}
.fas,
.far {
  padding-right: 1em;
  font-size: 1.5em;
}
.no-fa {
  padding-right: 0;
  font-size: 1em;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
}

td {
  overflow: hidden;
  white-space: nowrap;
}

.col-title {
  width: 700px;
}

.col-date {
  width: 150px;
}

.col-time {
  width: 150px;
}

</style>
