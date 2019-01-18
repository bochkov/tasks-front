<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h4>
          <i class="far fa-hand-lizard"></i>
          VARIABLES
        </h4>
        <table>
          <tr v-for="(value, propertyName, index) in task.vars" :key="index">
            <td>{{propertyName}}</td>
            <td v-html="tryLink(value)"></td>
          </tr>
        </table>
      </el-col>
      <el-col :span="12">
        <h4 class="ui horizontal divider header">
          <i class="far fa-hand-spock"></i>
          PARAMETERS
        </h4>
        <table>
          <tr v-for="(value, propertyName, index) in task.params" :key="index">
            <td>{{propertyName}}</td>
            <td v-html="tryLink(value)"></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h4 class="ui horizontal divider header">
          <i class="far fa-hand-rock"></i>
          COMMON
        </h4>
        <table class="ui definition compact table">
          <tbody>
            <tr>
              <td class="two wide column">oid</td>
              <td class="code">{{ task.oid }}</td>
            </tr>
            <tr>
              <td class="two wide column">job</td>
              <td class="code">{{ task.job }}</td>
            </tr>
            <tr>
              <td class="two wide column">schedule</td>
              <td class="code">
                <span v-for="(sched, index) in task.schedule" :key="index">
                  {{sched}}
                  <br>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="12">
        <h4 class="ui horizontal divider header">
          <i class="far fa-hand-scissors"></i>
          OPERATIONS
        </h4>
        <div>
          <el-button plain type="primary" size="medium" @click="confirmRun">
            <i class="fas no-fa fa-running"></i>
            Run job
          </el-button>
          <el-button plain type="danger" size="medium" @click="confirmDelete">
            <i class="fas no-fa fa-eraser"></i> Remove job
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["task"],
  data() {
    return {};
  },
  methods: {
    tryLink: function(value, length = 50) {
      if (typeof value == "string" && value.startsWith("http")) {
        if (value.length > length)
          return (
            "<a href='" + value + "'>" + value.substring(0, length) + "...</a>"
          );
        return "<a href='" + value + "'>" + value + "</a>";
      }
      return value;
    },
    confirmRun() {
      var msg = "";
      this.$confirm(msg, "Run Task", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(() => {
          this.$axi
            .post("/api/run/", { id: [this.task.oid] })
            .then(response => {
              var msg, type;
              if (response.data[this.task.oid].success) {
                msg = "job runned";
                type = "success";
              } else {
                msg = "something wrong";
                type = "error";
              }
              this.$message({
                message: msg,
                type: type,
                center: true
              });
            })
            .catch(() => {
              this.$message({
                message: "something wrong",
                type: "error",
                center: true
              });
            });
        })
        .catch(() => {});
    },
    confirmDelete() {
      var msg = "";
      this.$confirm(msg, "Delete Task", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(() => {
          this.$axi
            .post("/api/delete/", { id: [this.task.oid] })
            .then(response => {
              var msg, type;
              if (response.data[this.task.oid].success) {
                msg = "job deleted";
                type = "success";
              } else {
                msg = "something wrong";
                type = "error";
              }
              this.$message({
                message: msg,
                type: type,
                center: true
              });
              if (response.data[this.task.oid].success) {
                const loading = this.$loading({
                  lock: true,
                  text: "Loading",
                  background: "rgba(0, 0, 0, 0.7)"
                });
                this.$bus.$emit('fetchData');
                loading.close();
              }
            })
            .catch(() => {
              this.$message({
                message: "something wrong",
                type: "error",
                center: true
              });
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.code {
  font-family: "Inconsolata", monospace;
  font-size: 14px;
}
</style>
