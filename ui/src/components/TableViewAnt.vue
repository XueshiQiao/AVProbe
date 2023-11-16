<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script setup>
  import { cloneDeep } from 'lodash-es';
  import { reactive, ref } from 'vue';

  console.log("vscode: ", vscode);
  // debugger;

	// let mediaInfoTree = null;

	// document.querySelector('#probe_btn')?.addEventListener('click', e => {
	// 	vscode.postMessage({ type: 'probe' });
	// });

	// document.querySelector('#show_packets_btn')?.addEventListener('click', e => {
	// 	const selectStream = document.querySelector('#select_stream')
	// 	const streamType = selectStream.options[selectStream.selectedIndex].value;
	// 	vscode.postMessage({ type: 'show_packets', streamType: streamType});
	// });
	// // Handle messages from the extension
	// window.addEventListener('message', async e => {
	// 	const { type, body, requestId } = e.data;
	// 	switch (type) {
	// 		case 'init':
	// 			{
  //         console.log("hello world from vscode extension");
	// 				return;
	// 			}
	// 		case "media_info":
	// 			{
	// 				console.log("media_info: ", body);
	// 				if (mediaInfoTree) {
	// 					jsonview.destroy(mediaInfoTree);
	// 					mediaInfoTree = null;
	// 				}
	// 				mediaInfoTree = jsonview.renderJSON(body, document.querySelector('#media_info_tree'));
	// 				//debugger;
	// 				if (body.length <= 1024 * 1024 * 1) { // > 1M
	// 					jsonview.expand(mediaInfoTree);
	// 				}
	// 				return;
	// 			}
	// 		case "packets":
	// 			{
	// 				console.log("show packets: ", body);
	// 				// get selected value of select_stream "select" tag
	// 				if (mediaInfoTree) {
	// 					jsonview.collapse(mediaInfoTree);
	// 				}

	// 				const json = JSON.parse(body);
	// 				//debugger;
	// 				let html = "<table>";

	// 				const sample = {
	// 					"codec_type": "video",
	// 					"stream_index": 0,
	// 					"pts": 0,
	// 					"pts_time": "0.000000",
	// 					"dts": 0,
	// 					"dts_time": "0.000000",
	// 					"duration": 640,
	// 					"duration_time": "0.040000",
	// 					"size": "96089",
	// 					"pos": "48",
	// 					"flags": "K_"
	// 				};
	// 				html += "<tr>" +
	// 						"<th>" + "index" + "</th>" +
	// 						"<th>" + "codec_type" + "</th>" +
	// 						"<th>" + "stream_index" + "</th>" +
	// 						"<th>" + "pts" + "</th>" +
	// 						"<th>" + "pts_time" + "</th>" +
	// 						"<th>" + "dts" + "</th>" +
	// 						"<th>" + "dts_time" + "</th>" +
	// 						"<th>" + "duration" + "</th>" +
	// 						"<th>" + "duration_time" + "</th>" +
	// 						"<th>" + "size" + "</th>" +
	// 						"<th>" + "pos" + "</th>" +
	// 						"<th>" + "flags" + "</th>" +
	// 						"</tr>";
	// 				json["packets"].forEach((packet, index) => {
	// 					html += "<tr>" +
	// 					"<td>" + index + "</td>" +
	// 						"<td>" + packet["codec_type"] + "</td>" +
	// 						"<td>" + packet["stream_index"] + "</td>" +
	// 						"<td>" + packet["pts"] + "</td>" +
	// 						"<td>" + packet["pts_time"] + "</td>" +
	// 						"<td>" + packet["dts"] + "</td>" +
	// 						"<td>" + packet["dts_time"] + "</td>" +
	// 						"<td>" + packet["duration"] + "</td>" +
	// 						"<td>" + packet["duration_time"] + "</td>" +
	// 						"<td>" + packet["size"] + "</td>" +
	// 						"<td>" + packet["pos"] + "</td>" +
	// 						"<td>" + packet["flags"] + "</th>" +
	// 						"</tr>";
	// 				});
	// 				html += "</table>";
	// 				document.querySelector('#packets_info_table').innerHTML = html;
	// 				return;
	// 			}
	// 	}
	// });

	// Signal to VS Code that the webview is initialized.
	vscode.postMessage({ type: 'ready' });


const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = key => {
  delete editableData[key];
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
