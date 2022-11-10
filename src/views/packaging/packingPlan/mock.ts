export const headerInfo = {
  "Code": "nodeList",
  "Name": "包装计划节点列表",
  "Id": "1432",
  "Selection": false,
  "Columns": [
    {
      "Label": "任务名称",
      "Prop": "NodeName",
      "IsShow": true,
      "Type": "link",
      "Link": "",
      "IsFixed": true,
      "NeedDeal": true,
      "Width": 270
    },
    {
      "Label": "状态",
      "Prop": "StatusText",
      "IsShow": true,
      "Type": "",
      "Link": "",
      "IsFixed": false,
      "NeedDeal": false
    },
    {
      "Label": "正常/异常",
      "Prop": "NormalText",
      "IsShow": true,
      "Type": "",
      "Link": "",
      "IsFixed": false,
      "NeedDeal": false
    },
    {
      "Label": "计划完成时间",
      "Prop": "PlanFinishDateText",
      "IsShow": true,
      "Type": "",
      "Link": "",
      "IsFixed": false,
      "NeedDeal": false,
      "Width": 180
    },
    {
      "Label": "实际完成时间",
      "Prop": "ActualFinishDateText",
      "IsShow": true,
      "Type": "",
      "Link": "",
      "IsFixed": false,
      "NeedDeal": false,
      "Width": 150
    },
    {
      "Label": "前置任务",
      "Prop": "PrefixNodesName",
      "IsShow": true,
      "Type": "link",
      "Link": "",
      "IsFixed": false,
      "NeedDeal": true,
      "Width": 270
    },
    {
      "Label": "责任人",
      "Prop": "PMContent",
      "IsShow": true,
      "Type": "link",
      "Link": "",
      "IsFixed": false,
      "NeedDeal": true,
      "Width": 240
    },
    {
      "Label": "操作",
      "Prop": "Operater",
      "IsShow": true,
      "Type": "link",
      "IsFixed": "right",
      "NeedDeal": true
    }
  ],
  "HeadHandlers": []
}