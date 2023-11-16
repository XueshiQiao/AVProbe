<template>
  <a-space direction="vertical">
    <a-space>
      <a-button type="primary" @click="probe">Probe</a-button>
      <a-button type="primary" @click="showPacketInfo">Show Packets info</a-button>
    </a-space>
		<a-tree
			v-model:expandedKeys="expandedKeys"
			v-model:selectedKeys="selectedKeys"
			show-line
			:tree-data="treeData"
		>
			<template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
		</a-tree>
  </a-space>
</template>
<script setup>
import { ref } from 'vue';
const expandedKeys = ref(['0-0-0']);
const selectedKeys = ref([]);
let treeData = ref([
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
]);

const probe = () => {
	vscode.postMessage({
		type: 'probe',
	});
};

const showPacketInfo = () => {
	console.log('showPacketInfo');
	vscode.postMessage({
		type: 'show_packets',
		streamType: 0,
	});
};

const convertToTreeNode = (obj) => {
  const node = {
    title: '',
    key: '',
    children: []
  };
	// debugger;
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      const childNode = convertToTreeNode(obj[key]);
      childNode.title = key;
      childNode.key = key;
      node.children.push(childNode);
    } else {
      node.title = `${key}: ${obj[key]}`;
      node.key = key;
    }
  }
  return node;
}


	window.addEventListener('message', async e => {
		const { type, body, requestId } = e.data;
		switch (type) {
			case 'init':
				{
          console.log("hello world from vscode extension");
					return;
				}
			case "media_info":
				{
					console.log("media_info: ", body);
					const json = JSON.parse(body);
					// convert json to tree item


					let treeNode = [{
						title: json["format"]["filename"],
						key: "0-0-0",
						children: [{
							title: json["format"]["filename"],
							key: "0-0-1",
							children: []
							}
						]
					}];

					// const treeNode = convertToTreeNode(json);
					// console.log(treeNode);
					//TODO(here)
					// debugger;
					treeData.value = [treeNode];
					return;
				}
			case "packets":
				{
					console.log("show packets: ", body);
					// get selected value of select_stream "select" tag
					if (mediaInfoTree) {
						jsonview.collapse(mediaInfoTree);
					}

					const json = JSON.parse(body);
					//debugger;
					let html = "<table>";

					const sample = {
						"codec_type": "video",
						"stream_index": 0,
						"pts": 0,
						"pts_time": "0.000000",
						"dts": 0,
						"dts_time": "0.000000",
						"duration": 640,
						"duration_time": "0.040000",
						"size": "96089",
						"pos": "48",
						"flags": "K_"
					};
					html += "<tr>" +
							"<th>" + "index" + "</th>" +
							"<th>" + "codec_type" + "</th>" +
							"<th>" + "stream_index" + "</th>" +
							"<th>" + "pts" + "</th>" +
							"<th>" + "pts_time" + "</th>" +
							"<th>" + "dts" + "</th>" +
							"<th>" + "dts_time" + "</th>" +
							"<th>" + "duration" + "</th>" +
							"<th>" + "duration_time" + "</th>" +
							"<th>" + "size" + "</th>" +
							"<th>" + "pos" + "</th>" +
							"<th>" + "flags" + "</th>" +
							"</tr>";
					json["packets"].forEach((packet, index) => {
						html += "<tr>" +
						"<td>" + index + "</td>" +
							"<td>" + packet["codec_type"] + "</td>" +
							"<td>" + packet["stream_index"] + "</td>" +
							"<td>" + packet["pts"] + "</td>" +
							"<td>" + packet["pts_time"] + "</td>" +
							"<td>" + packet["dts"] + "</td>" +
							"<td>" + packet["dts_time"] + "</td>" +
							"<td>" + packet["duration"] + "</td>" +
							"<td>" + packet["duration_time"] + "</td>" +
							"<td>" + packet["size"] + "</td>" +
							"<td>" + packet["pos"] + "</td>" +
							"<td>" + packet["flags"] + "</th>" +
							"</tr>";
					});
					html += "</table>";
					document.querySelector('#packets_info_table').innerHTML = html;
					return;
				}
		}
	});



</script>
