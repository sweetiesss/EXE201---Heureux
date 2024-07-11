import axios from "axios";


const changingPort="ec2-18-179-37-110.ap-northeast-1.compute.amazonaws.com";
export const apiMainPort="http://"+changingPort+":8000/";

const conectStringAvailable = [
  "class-project-entity-controller",
  "class-project-search-controller",
  "class-project-property-reference-controller",
  "class-user-entity-controller",
  "class-user-property-reference-controller",
  "class-entity-controller",
  "class-search-controller",
  "profile-controller",
  "project-entity-controller",
  "project-search-controller",
  "report-entity-controller",
  "report-search-controller",
  "report-property-reference-controller",
  "task-entity-controller",
  "task-search-controller",
  "task-property-reference-controller",
  "team-entity-controller",
  "team-search-controller",
  "team-property-reference-controller",
  "user-entity-controller",
  "user-search-controller",
  "task-controller",
  "team-controller",
  "report-controller",
  "project-controller",
  "class-controller",
];

export const axiosConfig=axios.create({
    baseURL:apiMainPort,
    timeout:1000,
})


