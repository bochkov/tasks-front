<template>
  <div>
    <div class="content">
      <div class="ui grid">
        <div class="row">
          <div class="eight wide column">
            <h4 class="ui horizontal divider header">
              <i class="icon hand lizard"></i>
              VARIABLES
            </h4>
            {{task.vars}}
            <!-- <table class="ui definition compact table">
              <tbody>
                <tr :for="(value, propertyName, index) in task.vars" :key="index">
                  <td class="two wide column" :bind="propertyName"></td>
                  <td :bind="value"></td>
                </tr>
              </tbody>
            </table> -->
          </div>
          <div class="eight wide column">
            <h4 class="ui horizontal divider header">
              <i class="icon hand spock"></i>
              PARAMETERS
            </h4>
            {{task.params}}
            <!-- <table class="ui definition compact table">
              <tbody>
                <tr :for="(param, index) in task.params" :key="index">
                  <td class="two wide column" :bind="param"></td>
                  <td>{{ mcs.val_link(t.params.get(key)) }}</td>
                </tr>
              </tbody>
            </table> -->
          </div>
        </div>
        <div class="row">
          <div class="eight wide column">
            <h4 class="ui horizontal divider header">
              <i class="icon hand rock"></i>
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
          </div>
          <div class="eight wide column">
            <h4 class="ui horizontal divider header">
              <i class="icon hand scissors"></i>
              OPERATIONS
            </h4>
            <div>
              <el-button plain type="success" size="mini" icon="el-icon-bell" :bind="task._id">Run job</el-button>
              <el-button plain type="danger" size="mini" icon="el-icon-delete" :bind="task._id">Remove job</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["task"]
};
</script>

<style>
</style>
