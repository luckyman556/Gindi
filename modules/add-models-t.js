import * as THREE from '../node_modules/three/build/three.module.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { ColladaLoader } from '../node_modules/three/examples/jsm/loaders/ColladaLoader.js';
window.floor_obj = [];
window.appartments = [];
window.drag_objects = [];
window.floor_looring_list = [];
var appartments_array;
var svg_plans_url =  'resources/2d_plans/';
let main_model_json = '{"model_file":{"url":"http://localhost/bmby_cms/wp-content/uploads/2020/04/Gindi_MainBuilding_js_7.fbx","id":"20"},"5-7_APT_5-7_Int_2A_002_glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_windows":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_concrette":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_windows_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_2A_002_balckony":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_windows":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_concrette":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_windows_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_001_balckony":{"lightMap":""},"5-7_APT_5-7_Int_4Rw_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_windows":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_windows_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_concrette":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_5-7_VRayCompleteMap.jpg"},"5-7_APT_5-7_Int_4Rw_balckony":{"lightMap":""},"5-7_APT_5-7_Int_4Re_wall":{"lightMap":""},"5-7_APT_5-7_Int_4Re_floor":{"lightMap":""},"5-7_APT_5-7_Int_4Re_glass":{"lightMap":""},"5-7_APT_5-7_Int_4Re_panel":{"lightMap":""},"5-7_APT_5-7_Int_4Re_windows":{"lightMap":""},"5-7_APT_5-7_Int_4Re_concrette":{"lightMap":""},"5-7_APT_5-7_Int_4Re_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_4Re_balckony":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_concrette":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_panel":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_wall":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_floor":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_glass":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_windows":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_M_0135_DarkGray":{"lightMap":""},"5-7_APT_5-7_Int_4Re_001_balckony":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_floor":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_wall":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_glass":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_windows":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_concrette":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Rs_balckony":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_floor":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_wall":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_glass":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_windows":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_concrette":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Ra_balckony":{"lightMap":""},"5-7_APT_5-7_Int_3Da_floor":{"lightMap":""},"5-7_APT_5-7_Int_3Da_glass":{"lightMap":""},"5-7_APT_5-7_Int_3Da_concrette":{"lightMap":""},"5-7_APT_5-7_Int_3Da_windows":{"lightMap":""},"5-7_APT_5-7_Int_3Da_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Da_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Da_wall":{"lightMap":""},"5-7_APT_5-7_Int_3Da_balckony":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_floor":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_concrette":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_windows":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_glass":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_wall":{"lightMap":""},"5-7_APT_5-7_Int_3Da_001_balckony":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_floor":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_wall":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_glass":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_windows":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_concrette":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_panel":{"lightMap":""},"5-7_APT_5-7_Int_2A_003_balckony":{"lightMap":""},"5-7_APT_5-7_Int_2A_floor":{"lightMap":""},"5-7_APT_5-7_Int_2A_wall":{"lightMap":""},"5-7_APT_5-7_Int_2A_glass":{"lightMap":""},"5-7_APT_5-7_Int_2A_windows":{"lightMap":""},"5-7_APT_5-7_Int_2A_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_2A_panel":{"lightMap":""},"5-7_APT_5-7_Int_2A_concrette":{"lightMap":""},"5-7_APT_5-7_Int_2A_balckony":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_floor":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_wall":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_windows":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_glass":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_panel":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_windows_panel":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_concrette":{"lightMap":""},"5-7_APT_5-7_Int_2A_001_balckony":{"lightMap":""},"5-7_hall_5-7_concrette":{"lightMap":""},"5-7_hall_5-7_floor":{"lightMap":""},"5-7_hall_5-7_wall":{"lightMap":""},"5-7_hall_5-7_lift":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/white-lightmap.jpg"},"8-11_APT_8-11_Int_2A_002_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_concrette":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_windows":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_windows_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_002_balckony":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_8-11_VRayCompleteMap-scaled.jpg"},"8-11_APT_8-11_Int_2A_003_wall":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_concrette":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_panel":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_floor":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_glass":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_windows":{"lightMap":""},"8-11_APT_8-11_Int_2A_003_balckony":{"lightMap":""},"8-11_APT_8-11_Int_2A_wall":{"lightMap":""},"8-11_APT_8-11_Int_2A_floor":{"lightMap":""},"8-11_APT_8-11_Int_2A_concrette":{"lightMap":""},"8-11_APT_8-11_Int_2A_glass":{"lightMap":""},"8-11_APT_8-11_Int_2A_panel":{"lightMap":""},"8-11_APT_8-11_Int_2A_windows":{"lightMap":""},"8-11_APT_8-11_Int_2A_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_2A_balckony":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_wall":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_floor":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_concrette":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_panel":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_glass":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_windows":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_2A_001_balckony":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_wall":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_floor":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_concrette":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_glass":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_panel":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_windows":{"lightMap":""},"8-11_APT_8-11_Int_3Da_001_balckony":{"lightMap":""},"8-11_APT_8-11_Int_3Da_wall":{"lightMap":""},"8-11_APT_8-11_Int_3Da_floor":{"lightMap":""},"8-11_APT_8-11_Int_3Da_concrette":{"lightMap":""},"8-11_APT_8-11_Int_3Da_glass":{"lightMap":""},"8-11_APT_8-11_Int_3Da_windows":{"lightMap":""},"8-11_APT_8-11_Int_3Da_panel":{"lightMap":""},"8-11_APT_8-11_Int_3Da_balckony":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_wall":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_windows":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_concrette":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_floor":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_balckony":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_glass":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_panel":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_001_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_wall":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_floor":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_concrette":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_glass":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_windows":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_panel":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_3Ra_balckony":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_wall":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_floor":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_concrette":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_glass":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_windows":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Re_001_balckony":{"lightMap":""},"8-11_APT_8-11_Int_4Re_wall":{"lightMap":""},"8-11_APT_8-11_Int_4Re_floor":{"lightMap":""},"8-11_APT_8-11_Int_4Re_concrette":{"lightMap":""},"8-11_APT_8-11_Int_4Re_glass":{"lightMap":""},"8-11_APT_8-11_Int_4Re_windows":{"lightMap":""},"8-11_APT_8-11_Int_4Re_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Re_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Re_balckony":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_wall":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_floor":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_windows":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_glass":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_concrette":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_001_balckony":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_wall":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_floor":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_glass":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_concrette":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_windows_panel":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_windows":{"lightMap":""},"8-11_APT_8-11_Int_4Rw_balckony":{"lightMap":""},"8-11_hall_8-11_floor":{"lightMap":""},"8-11_hall_8-11_wall":{"lightMap":""},"8-11_hall_8-11_lift":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/white-lightmap.jpg"},"12-20_APT_12-20_Int_3Re_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_concrette":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_windows_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_windows":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_APT_12-20_Int_3Re_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_balckony":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_12-20_001VRayCompleteMap.jpg"},"12-20_hall_12-20_wall":{"lightMap":""},"12-20_hall_12-20_floor":{"lightMap":""},"12-20_hall_12-20_lift":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/white-lightmap.jpg"},"12-20_APT_12-20_Int_4Re_wall":{"lightMap":""},"12-20_APT_12-20_Int_4Re_floor":{"lightMap":""},"12-20_APT_12-20_Int_4Re_concrette":{"lightMap":""},"12-20_APT_12-20_Int_4Re_glass":{"lightMap":""},"12-20_APT_12-20_Int_4Re_panel":{"lightMap":""},"12-20_APT_12-20_Int_4Re_windows":{"lightMap":""},"12-20_APT_12-20_Int_4Re_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_4Re_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Da_001_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Da_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Da_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Da_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Da_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Da_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Da_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Da_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ra_001_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Rw_balckony":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_wall":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_floor":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_glass":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_windows":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_panel":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_concrette":{"lightMap":""},"12-20_APT_12-20_Int_4Rw_balckony":{"lightMap":""},"12-20_APT_12-20_Int_4M_wall":{"lightMap":""},"12-20_APT_12-20_Int_4M_floor":{"lightMap":""},"12-20_APT_12-20_Int_4M_concrette":{"lightMap":""},"12-20_APT_12-20_Int_4M_panel":{"lightMap":""},"12-20_APT_12-20_Int_4M_windows":{"lightMap":""},"12-20_APT_12-20_Int_4M_glass":{"lightMap":""},"12-20_APT_12-20_Int_4M_balckony":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_wall":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_floor":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_concrette":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_windows_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_panel":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_glass":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_windows":{"lightMap":""},"12-20_APT_12-20_Int_3Ds_001_balckony":{"lightMap":""},"21-43_hall_21-43_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_hall_21-43_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_hall_21-43_lift":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/white-lightmap.jpg"},"21-43_APT_21-43_Int_5R_wall":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_floor":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_windows":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_windows_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_concrette":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_panel":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_5R_balckony":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/APT_21-43_001VRayCompleteMap.jpg"},"21-43_APT_21-43_Int_4P_001_wall":{"lightMap":""},"21-43_APT_21-43_Int_4P_001_floor":{"lightMap":""},"21-43_APT_21-43_Int_4P_001_glass":{"lightMap":""},"21-43_APT_21-43_Int_4P_001_windows":{"lightMap":""},"21-43_APT_21-43_Int_4P_001_panel":{"lightMap":""},"21-43_APT_21-43_Int_4P_001_concrette":{"lightMap":""},"21-43_APT_21-43_Int_4P_001_balckony":{"lightMap":""},"21-43_APT_21-43_Int_4P_wall":{"lightMap":""},"21-43_APT_21-43_Int_4P_floor":{"lightMap":""},"21-43_APT_21-43_Int_4P_glass":{"lightMap":""},"21-43_APT_21-43_Int_4P_windows":{"lightMap":""},"21-43_APT_21-43_Int_4P_panel":{"lightMap":""},"21-43_APT_21-43_Int_4P_concrette":{"lightMap":""},"21-43_APT_21-43_Int_4P_balckony":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_wall":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_floor":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_glass":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_windows":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_concrette":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_panel":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_windows_panel":{"lightMap":""},"21-43_APT_21-43_Int_3M_001_balckony":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_wall":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_floor":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_glass":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_panel":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_windows":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_concrette":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_windows_panel":{"lightMap":""},"21-43_APT_21-43_Int_5R_001_balckony":{"lightMap":""},"21-43_APT_21-43_Int_5P_wall":{"lightMap":""},"21-43_APT_21-43_Int_5P_windows_panel":{"lightMap":""},"21-43_APT_21-43_Int_5P_windows":{"lightMap":""},"21-43_APT_21-43_Int_5P_floor":{"lightMap":""},"21-43_APT_21-43_Int_5P_concrette":{"lightMap":""},"21-43_APT_21-43_Int_5P_glass":{"lightMap":""},"21-43_APT_21-43_Int_5P_panel":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_wall":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_floor":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_panel":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_glass":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_windows":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_windows_panel":{"lightMap":""},"21-43_APT_21-43_Int_5P_001_concrette":{"lightMap":""},"21-43_APT_21-43_Int_3M_wall":{"lightMap":""},"21-43_APT_21-43_Int_3M_floor":{"lightMap":""},"21-43_APT_21-43_Int_3M_panel":{"lightMap":""},"21-43_APT_21-43_Int_3M_windows_panel":{"lightMap":""},"21-43_APT_21-43_Int_3M_glass":{"lightMap":""},"21-43_APT_21-43_Int_3M_windows":{"lightMap":""},"21-43_APT_21-43_Int_3M_concrette":{"lightMap":""},"21-43_APT_21-43_Int_3M_balckony":{"lightMap":""},"Lobby_Glass_det_Color_M08":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Glass_det_Translucent_Glass_Gray":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Glass_det_glass_gindi2":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Glass_det_Material #87":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Glass_det_M_0132_LightGray":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Windows_Windows_mtl":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Floor_Floor_mtl":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Glass_Glass":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Wentilation_Wentilation_mtl":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Decoration_Decoration_mtl":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Wall_Material #87":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Lobby_Wall_Material #88":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/lobbyVRayCompleteMap.jpg"},"Roof_panel_roof_panel_roof":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"},"Roof_wall_roof_wall_roof":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"},"Roof_glass_roof_Material #434":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/white-lightmap.jpg"},"Roof_det_roof_det_roof":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"},"Roof_floor_roof_floor_roof":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"},"Roof_windows_roof_windows_roof":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"},"Roof_wire_wire":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"},"Roof_went_went":{"lightMap":"http://localhost/bmby_cms/wp-content/uploads/2020/04/roofVRayCompleteMap.jpg"}}';
let main_model_json_obj = JSON.parse(main_model_json);
console.log(main_model_json_obj);
let array_360 = {
    A : 'https://dreamsimages.bmby.com/new/artimus117/apt-a/index.htm',
    B : 'https://dreamsimages.bmby.com/new/artimus117/apt-b/index.htm',
    E : 'https://dreamsimages.bmby.com/new/artimus117/apt-e/index.htm',
    G : 'https://dreamsimages.bmby.com/new/artimus117/apt-g/index.htm',
    H : 'https://dreamsimages.bmby.com/new/artimus117/apt-h/index.htm',
};
appartments_array = {

};
export function add_models( scene, all_appartments) {







    var loader = new FBXLoader();
    function replace_json_url (json_url) {
        return json_url.replace('http://localhost/bmby_cms/wp-content/uploads/','resources/')
    }

    let materials_array = {};
    loader.load( replace_json_url (main_model_json_obj.model_file.url), function(loaded_obj){

            let panel_texture;
            let beton_texture;
            let tile_material;
            let lift_texture;
            let texture_loader = new THREE.TextureLoader();
            let reflection_material = texture_loader.load( 'resources/material/textures/360_half.jpg' );
            reflection_material.mapping = THREE.EquirectangularReflectionMapping;
            reflection_material.minFilter = THREE.NearestMipmapLinearFilter;
            reflection_material.roughness = 0;


           // reflection_material.encoding = THREE.LinearEncoding;
            //reflection_material.magFilter  = THREE.NearestFilter;
            reflection_material.wrapS = THREE.RepeatWrapping;
            reflection_material.wrapT = THREE.RepeatWrapping;
            function add_textures_from_cms (loaded_obj) {
                let textures_urls_array = [];


                beton_texture = texture_loader.load( 'resources/material/textures/concrette_diffuse_2_o.jpg' );
                beton_texture.wrapS = THREE.RepeatWrapping;
                beton_texture.wrapT = THREE.RepeatWrapping;
                beton_texture.repeat.set( 0.1, 0.1 );
                beton_texture.encoding = THREE.LinearEncoding;

                tile_material = texture_loader.load( 'resources/material/textures/tiles_017_o.jpg' );
                tile_material.wrapS = THREE.RepeatWrapping;
                tile_material.wrapT = THREE.RepeatWrapping;
                tile_material.repeat.set( 0.5, 0.5 );
                tile_material.encoding = THREE.LinearEncoding;

                let lift_texture = texture_loader.load( 'resources/material/textures/1561-X-inside-core.jpg' );
                lift_texture.encoding = THREE.LinearEncoding;

                let floor_texture = texture_loader.load( 'resources/material/textures/Floor_diffuse.jpg' );
                floor_texture.encoding = THREE.LinearEncoding;
                floor_texture.wrapS = THREE.RepeatWrapping;
                floor_texture.wrapT = THREE.RepeatWrapping;
                floor_texture.repeat.set( 0.8, 0.8 );

                panel_texture  = texture_loader.load( 'resources/material/textures/Tile.jpg' );
                panel_texture.encoding = THREE.LinearEncoding;
                panel_texture.wrapS = THREE.RepeatWrapping;
                panel_texture.wrapT = THREE.RepeatWrapping;
                panel_texture.repeat.set( 10, 10 );

                // paluba materials
                    let paluba_map = texture_loader.load( 'resources/material/textures/paluba/paluba_BaseColor_o.jpeg' );
                    paluba_map.encoding = THREE.LinearEncoding;
                    paluba_map.wrapS = THREE.RepeatWrapping;
                    paluba_map.wrapT = THREE.RepeatWrapping;
                    paluba_map.repeat.set( 0.4, 0.4 );

                    let paluba_bumb_map = texture_loader.load( 'resources/material/textures/paluba/paluba_Height.jpeg' );
                    paluba_bumb_map.encoding = THREE.LinearEncoding;
                    paluba_bumb_map.wrapS = THREE.RepeatWrapping;
                    paluba_bumb_map.wrapT = THREE.RepeatWrapping;
                    paluba_bumb_map.repeat.set( 0.4, 0.4 );

                    let paluba_ao_map = texture_loader.load( 'resources/material/textures/paluba/paluba_Ambient_Occlusion.jpeg' );
                   // paluba_ao_map.encoding = THREE.LinearEncoding;
                    // paluba_ao_map.wrapS = THREE.RepeatWrapping;
                    // paluba_ao_map.wrapT = THREE.RepeatWrapping;
                    // paluba_ao_map.repeat.set( 0.4, 0.4 );

                    let paluba_normalMap_map = texture_loader.load( 'resources/material/textures/paluba/paluba_Normal.jpeg' );
                    paluba_normalMap_map.encoding = THREE.LinearEncoding;
                    paluba_normalMap_map.wrapS = THREE.RepeatWrapping;
                    paluba_normalMap_map.wrapT = THREE.RepeatWrapping;
                    paluba_normalMap_map.repeat.set( 0.4, 0.4 );

                    let paluba_specularMap_map = texture_loader.load( 'resources/material/textures/paluba/paluba_SpecularLevel.jpeg' );
                    paluba_specularMap_map.encoding = THREE.LinearEncoding;
                    paluba_specularMap_map.wrapS = THREE.RepeatWrapping;
                    paluba_specularMap_map.wrapT = THREE.RepeatWrapping;
                    paluba_specularMap_map.repeat.set( 0.4, 0.4 );


                // paluba materials end

                // tile materials
                let tile_map = texture_loader.load( 'resources/material/textures/tile/PLITKA_BaseColor.jpeg' );
                tile_map.encoding = THREE.LinearEncoding;
                tile_map.wrapS = THREE.RepeatWrapping;
                tile_map.wrapT = THREE.RepeatWrapping;
                tile_map.repeat.set( 0.4, 0.4 );

                let tile_bumb_map = texture_loader.load( 'resources/material/textures/tile/PLITKA_Height.jpeg' );
                tile_bumb_map.encoding = THREE.LinearEncoding;
                tile_bumb_map.wrapS = THREE.RepeatWrapping;
                tile_bumb_map.wrapT = THREE.RepeatWrapping;
                tile_bumb_map.repeat.set( 0.4, 0.4 );



                let tile_normalMap_map = texture_loader.load( 'resources/material/textures/tile/PLITKA_Normal.jpeg' );
                tile_normalMap_map.encoding = THREE.LinearEncoding;
                tile_normalMap_map.wrapS = THREE.RepeatWrapping;
                tile_normalMap_map.wrapT = THREE.RepeatWrapping;
                tile_normalMap_map.repeat.set( 0.4, 0.4 );

                let tile_specularMap_map = texture_loader.load( 'resources/material/textures/tile/PLITKA_Specular.jpeg' );
                tile_specularMap_map.encoding = THREE.LinearEncoding;
                tile_specularMap_map.wrapS = THREE.RepeatWrapping;
                tile_specularMap_map.wrapT = THREE.RepeatWrapping;
                tile_specularMap_map.repeat.set( 0.4, 0.4 );


                // tile materials end


                let depth = 0;

                add_textures_to_object (loaded_obj,depth);
                console.log(textures_urls_array);
                function add_textures_to_object( object ,depth , prefix = '') {
                    if (object.children.length > 0) {
                        object.children.forEach(function(item){
                            let local_prefix = prefix + item.name + '_';
                            add_textures_to_object (item, depth + 1, local_prefix);
                        });
                    } else {
                        let object_name = object.name;
                        if (Array.isArray( object.material)) {

                            object.material.forEach(function(item, i){
                                if (item.name != glass_name) {
                                    item.color.setColorName('white');
                                    item.userData.not_color_change = false;
                                } else {
/*                                    object.material[i] = new THREE.MeshLambertMaterial({name : glass_name} );
                                    object.material[i].transparent = true;
                                    object.material[i].opacity = glass_base_opacity;
                                    object.material[i].envMap = reflection_material;
                                    object.material[i].side = 2;
                                    object.material[i].color.setHex(item.color.getHex())
                                    object.material[i].userData.not_color_change = true;
                                    add_material_row (object.material[i]);*/
                                    item.envMap = reflection_material;
                                    item.userData.not_color_change = true;
                                    item.transparent = true;
                                    item.opacity = glass_base_opacity;
                                    item.color.setColorName('white');
                                    item.side = 2;
                                    item.needsUpdate = true;
                                }
                                if (item.name == 'concrette') {
                                    item.map = beton_texture;
                                }
                                if (item.name == 'wall') {
                                    item.map = beton_texture;
                                }
                                if (item.name == 'lift') {
                                    item.map = lift_texture;
                                }
                                if (item.name == 'floor') {
                                   // item.userData.not_color_change = true;
                                    item.opacity = 0.9;
                                    item.transparent = true;
                                    item.map = tile_map;
                                    item.bumpMap = tile_bumb_map;
                                    // item.aoMap = tile_ao_map;
                                    //item.aoMapIntensity  = 0.2;
                                    item.normalMap = tile_normalMap_map;
                                    item.specularMap = tile_specularMap_map;
                                    //item.name = glass_name;
                                }
                                if (item.name == 'windows_panel') {
                                    item.envMap = reflection_material;
                                    item.side = 2;
                                }
                                if (item.name == 'windows') {
                                    item.color.setColorName('black');
                                }
                                if (item.name == 'balckony') {
                                    item.userData.not_color_change = true;
                                   // item.opacity = 0.9;
                                    //item.transparent = true;
                                    item.color.setColorName('white');
                                    item.map = paluba_map;
                                    item.bumpMap = paluba_bumb_map;
                                    // item.aoMap = paluba_ao_map;
                                    //item.aoMapIntensity  = 0.2;
                                    item.normalMap = paluba_normalMap_map;
                                    item.specularMap = paluba_specularMap_map;
                                }
                                if (item.name == 'panel') {
                                    item.map = panel_texture;
                                    item.side = 2;
                                }
                                add_material_row (item);

                            });
                        } else {
                            if (object.material.name != glass_name) {
                                object.material.color.setHex('0xcccccc');
                            } else {
                                item.transparent = true;
                                item.opacity = glass_base_opacity;
                                item.envMap = reflection_material;
                            }

                            add_material_row (object.material)
                        }
                        function add_material_row (material) {
                            add_img (object, 'lightMap' , 'Light map:', material);
                            function add_img (object,parameter , title, material) {
                                let name = prefix + material.name;
                                let img_url = '';
                                if (main_model_json_obj[name] != undefined) {
                                    if (main_model_json_obj[name][parameter] != undefined) {
                                        img_url = main_model_json_obj[name][parameter];
                                        img_url = replace_json_url (img_url);
                                        if (img_url.length > 0) {
                                            if (textures_urls_array.length > 0) {
                                                let url_existed = false;
                                                let existed_index = 0;
                                                textures_urls_array.forEach(function(item, i) {
                                                    if (item == img_url) {
                                                        url_existed = true;
                                                        existed_index = i;
                                                    }

                                                });
                                                if (url_existed == false) {
                                                    add_texture (textures_urls_array.length, material, parameter);
                                                } else {
                                                    material[parameter] = materials_array['texture_' + existed_index];
                                                }
                                            } else {
                                                add_texture (0, material, parameter);
                                            }
                                        }
                                        function add_texture (index, material, parameter) {
                                            materials_array['texture_' + index] = texture_loader.load(img_url  , function(texture){
                                                texture.encoding = THREE.LinearEncoding;
                                            });
                                            material[parameter] = materials_array['texture_' + index];
                                            textures_urls_array.push(img_url);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            add_textures_from_cms(loaded_obj);
            var zoom_i = 0.001;
            let lobby = loaded_obj.children[4].clone();
            lobby.scale.set(zoom_i, zoom_i, zoom_i);
            lobby.position.set(0, 0, -4.7);
            scene.add(lobby);
            loaded_obj.children[0].scale.set(zoom_i, zoom_i, zoom_i);
            loaded_obj.children[1].scale.set(zoom_i, zoom_i, zoom_i);
            loaded_obj.children[2].scale.set(zoom_i, zoom_i, zoom_i);
            loaded_obj.children[3].scale.set(zoom_i, zoom_i, zoom_i);
            zoom_i = 0.010010593995981724;
            loaded_obj.children[5].scale.set(zoom_i, zoom_i, zoom_i);
            // loaded_obj.children[5].scale.set(zoom_i, zoom_i, zoom_i);
            console.log(loaded_obj);
            window.control = control;
            window.loaded_obj_global = loaded_obj;


            let start_i = 5;
            let target_y;
            let start_y = 7.936338065283678;
            let i = 0;
            let floor_1;
            var building = [];
            while (start_i <= 7) {
                let object_to_clone = loaded_obj.children[0];
                prepare_obj_to_clone (object_to_clone);
                floor_1 = object_to_clone.clone();
                target_y = start_y + (11.189571354476431  - start_y) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building.push(floor_1);
                start_i++;
                i++;
            }

            i = 0;
            start_i = 8;
            start_y = 17.723277938571606;
            while (start_i <= 11) {
                floor_1 = loaded_obj.children[1].clone();
                target_y = start_y + (21.103525837646536  - start_y ) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building.push(floor_1);
                start_i++;
                i++;
            }

            window.floor_obj.forEach(function(flats){
                flats.forEach(function(flat){
                    flat.visible = false;
                });
            });

            // 32.68426953487138
            i = 0;
            start_i = 12;
            start_y = 31.134269534871372;
            while (start_i <= 20) {
                floor_1 = loaded_obj.children[2].clone();
                target_y = start_y + (21.103525837646536  - 17.723277938571606 ) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building.push(floor_1);
                start_i++;
                i++;

            }
            i = 0;
            start_i = 21;
            start_y = 61.39650062654584;
            while (start_i <= 43) {
                floor_1 = loaded_obj.children[3].clone();
                target_y = start_y + (22.06352583764656  - 18.523277938571617) * i;
                floor_1.position.set(0, target_y, 0);
                scene.add(floor_1);
                building.push(floor_1);
                start_i++;
                i++;
            }
            i = 0;
            floor_1 = loaded_obj.children[5].clone();
            floor_1.position.set(0, 147.179, -4.7);
            scene.add(floor_1);
            building.push(floor_1);
            building.push(lobby);
            start_i++;
            i++;




        var textures_counter = 0;
        var loaded_texture_counter = 0;
        function on_load_texture (texture) {
            // texture.encoding = THREE.sRGBEncoding;
            loaded_texture_counter++;
            let textures_percent = loaded_texture_counter / textures_counter  * 100;
            // console.log('material #' + loaded_texture_counter + ' loaded textures percent ' + textures_percent);
            progress_bar_update (3, textures_percent , `Loading textures ${loaded_texture_counter} from  ${textures_counter}` );
            if (loaded_texture_counter == textures_counter) {
                $('.to-page').addClass('active');
                progress_bar_update (3, 100 , 'Load complete');
                $('.preloader').addClass('completed');
                if ($('body').hasClass('page-template-only-model') == true) {
                    $('.preloader .to-page').trigger('click');
                }
            };

        }





        second_model = loaded_obj ;
        second_model.renderOrder = 0;

        console.log(loaded_obj);






        var flat_count = 0;
        var floor_obj_length = 0;
        var json_i = 0;
        var material_flat_arr = {};
        var flat_texture_loader_count = 0;
        var loaded_flat_texture_counter = 0;
        let flats_without_concessions = 0;
        let min_rooms = 999999;
        let max_rooms = 0;
        let modelNames = {};
        building.forEach(function(element, floor_index){
         if (element.name == 'Roof') {


                window.roof = element;

                var user_data = window.roof.userData;

                user_data.base_position_z = window.roof.position.z;

                var flat_clone = element.clone();

                find_n_clone_material (element, flat_clone);


                user_data.lobby_or_roof = true;
                user_data.status_color = lobby_n_roof_hover_color;
                user_data.url_360 = roof_360;
               // set_mesh_base_color (element);

            } else if (element.name == 'Lobby') {

               window.lobby = element;
                var user_data = window.lobby.userData;
                user_data.base_position_z = window.lobby.position.z;
                user_data.lobby_or_roof = true;
                user_data.status_color = lobby_n_roof_hover_color;

                user_data.url_360 = lobby_360;
                // set_mesh_base_color (element);
            } else {
              all_floors[floor_index] =  element;
              window.floor_obj[floor_index] = [];
              var flat_number = 0;
              textures_counter++;
              element.children.forEach(function(flat, flat_index){
                  if (flat.name.search('hall_') == -1) {

                      // flat.material[2].color.setColorName('blue');

                      var flat_clone = flat.clone();


                      find_n_clone_material (flat, flat_clone);

                      window.floor_obj[floor_index][flat_number] = flat;

                      flat.renderOrder = 0;

                      var user_data = flat.userData;
                      user_data.base_position = {x :flat.position.x, y :flat.position.y, z : flat.position.z};
                      user_data.change_color = true;
                      user_data.target_color = true;
                      var random_number = Math.floor(flat_statuses.length * Math.random());


                      var rooms_array = ['0', '1' , '2'];
                      var rooms_array_index = Math.floor(3 * Math.random());


                      user_data.center_point = getCenterPoint(flat);
                      var flat_name_letter = flat.name.replace('APT_','').replace('_F_','').replace(floor_index,'');
                      user_data.letter = flat_name_letter;
                      var floor_prefix = floor_index + 1;
                      if (floor_prefix == 13) {
                          floor_prefix = 'PH';
                      }
                      var engine_id = floor_prefix + flat_name_letter;
/*                        if (sorted_json[engine_id] != undefined) {
                            user_data.crm_data = sorted_json[engine_id];
                        } else {
                            let floor = sorted_json[floor_index + 5];
                            let floor_keys = Object.keys(floor);

                            let current_key = floor_keys[flat_number];
                            let current_flat = floor[current_key];
                            if (current_flat == undefined) {
                                user_data.crm_data =  floor[floor_keys[0]];
                            } else {
                                user_data.crm_data = current_flat;
                            }

                        }*/
                      user_data.crm_data =  sorted_json[4001];
                      if (floor_index < 3) {
                           if (flat.name =='APT_5-7_Int_4Rw_001') {
                              let current_prop_num = 4000 + floor_index * 12 + 1;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_2A_003') {
                              let current_prop_num = 4000 + floor_index * 12 + 2;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_2A_002') {
                              let current_prop_num = 4000 + floor_index * 12 + 3;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_4Re_001') {
                              let current_prop_num = 4000 + floor_index * 12 + 4;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_3Ra') {
                              let current_prop_num = 4000 + floor_index * 12 + 5;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_3Da_001') {
                              let current_prop_num = 4000 + floor_index * 12 + 6;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_3Da') {
                              let current_prop_num = 4000 + floor_index * 12 + 7;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_3Rs') {
                              let current_prop_num = 4000 + floor_index * 12 + 8;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_4Re') {
                              let current_prop_num = 4000 + floor_index * 12 + 9;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_2A_001') {
                              let current_prop_num = 4000 + floor_index * 12 + 10;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_2A') {
                              let current_prop_num = 4000 + floor_index * 12 + 11;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          } else if (flat.name =='APT_5-7_Int_4Rw') {
                              let current_prop_num = 4000 + floor_index * 12 + 12;
                              let current_crm_data = sorted_json[current_prop_num];
                              user_data.crm_data = current_crm_data;
                          }
                      } else if (floor_index < 7) {
                          let flats_names = [
                              'APT_8-11_Int_4Rw',
                              'APT_8-11_Int_2A_001',
                              'APT_8-11_Int_2A_002',
                              'APT_8-11_Int_4Re_001',
                              'APT_8-11_Int_3Ra_001',
                              'APT_8-11_Int_3Da',
                              'APT_8-11_Int_3Da_001',
                              'APT_8-11_Int_3Ra',
                              'APT_8-11_Int_4Re',
                              'APT_8-11_Int_2A',
                              'APT_8-11_Int_2A_003',
                              'APT_8-11_Int_4Rw_001',
                          ];
                          let floor_mod = floor_index - 3;
                          let start_prop_num = 4036;
                          flats_names.forEach(function(flat_name, i) {
                              let flat_number_in_floor =  i + 1;
                              if (flat.name == flat_name) {
                                  let current_prop_num = start_prop_num + floor_mod * 12 + flat_number_in_floor;
                                  let current_crm_data = sorted_json[current_prop_num];
                                  user_data.crm_data = current_crm_data;
                              }
                          });
                      }
                      else if (floor_index < 16) {
                          let flats_names = [
                              'APT_12-20_Int_4Rw',
                              'APT_12-20_Int_4M',
                              'APT_12-20_Int_4Re',
                              'APT_12-20_Int_3Ra_001',
                              'APT_12-20_Int_3Da',
                              'APT_12-20_Int_3Da_001',
                              'APT_12-20_Int_3Ra',
                              'APT_12-20_Int_3Re',
                              'APT_12-20_Int_3Ds',
                              'APT_12-20_Int_3Ds_001',
                              'APT_12-20_Int_3Rw',
                          ];
                          let floor_mod = floor_index - 7;
                          let start_prop_num = 4084;
                          flats_names.forEach(function(flat_name, i) {
                              let flat_number_in_floor =  i + 1;
                              if (flat.name == flat_name) {
                                  let current_prop_num = start_prop_num + floor_mod * 11 + flat_number_in_floor;
                                  let current_crm_data = sorted_json[current_prop_num];
                                  user_data.crm_data = current_crm_data;
                              }
                          });
                      }
                      else if (floor_index < 39) {
                          let flats_names = [
                              'APT_21-43_Int_5R',
                              'APT_21-43_Int_4P_001',
                              'APT_21-43_Int_5P',
                              'APT_21-43_Int_3M_001',
                              'APT_21-43_Int_3M',
                              'APT_21-43_Int_5P_001',
                              'APT_21-43_Int_4P',
                              'APT_21-43_Int_5R_001',
                          ];
                          let floor_mod = floor_index - 16;
                          let start_prop_num = 4183;
                          flats_names.forEach(function(flat_name, i) {
                              let flat_number_in_floor =  i + 1;
                              if (flat.name == flat_name) {
                                  let current_prop_num = start_prop_num + floor_mod * 8 + flat_number_in_floor;
                                  let current_crm_data = sorted_json[current_prop_num];
                                  user_data.crm_data = current_crm_data;
                              }
                          });
                      }





                      let current_apt_rooms = user_data.crm_data.roomNum;
                      if ( current_apt_rooms < min_rooms) {
                          min_rooms = current_apt_rooms;
                      }
                      if (current_apt_rooms > max_rooms) {
                          max_rooms = current_apt_rooms;
                      }


                      user_data.bedrooms = rooms_array[rooms_array_index];
                      {
                      let flat_model_name =  user_data.crm_data.modelName;
                          if (modelNames[flat_model_name] == undefined) {
                              modelNames[flat_model_name] = {
                                  name : flat_model_name,
                                  prop_num : user_data.crm_data.propNum,
                                  floor_num : user_data.crm_data.floorNum,
                              }

                          }
                      }


                    if (user_data.crm_data.status == "Available") {
                          random_number = 1;
                      } else {
                          random_number = 0;
                      }
                      let flat_model_name =  user_data.crm_data.modelName;

                      user_data.svg_plan = svg_plans_url +  flat_model_name + '.jpg';
                      user_data.status_index =  random_number;
                      user_data.status_color = flat_statuses[random_number]['color'];

                      user_data.status_name = flat_statuses[random_number]['name'];
                        //actual_JSON[10].saleStatus
//                        console.log(user_data.crm_data.saleStatus );


                      user_data.rent_price = user_data.crm_data.salePrice;

                      var geometry = new THREE.BoxBufferGeometry( 0.0001, 0.0001, 0.0001 );
                      var material = new THREE.MeshPhongMaterial({
                          color: 'red',
                          opacity: 1,
                          transparent: true,
                      });
                      var cubeA = new THREE.Mesh( geometry, material );
                      cubeA.position.set(user_data.center_point.x,user_data.center_point.y ,user_data.center_point.z) ;
                      cubeA.name = 'center';
                      flat.add(cubeA);


                      
                      set_mesh_base_color (flat);

                      user_data.floor = floor_index;
                      user_data.flat_i = flat_number;
                      user_data.flat_counter = flat_count;
                      if (positioning_mode == true ) {
                          window.drag_objects.push(flat);
                      }

                      all_appartments.push(flat);
                      flat_count++;
                      flat_number++;

                      json_i++;

                      if (json_i > 104) {
                          json_i = 0;
                      }
                  } else {


                      var flat_clone = flat.clone();
                      find_n_clone_material (flat, flat_clone);
/*
                      if (flat.material.emissive != undefined) {
                          flat.material.emissive.set('#b8b8b8');
                          flat.material.emissiveIntensity = 1;
                      }
*/


                      flooring_obj[floor_index] = flat;
                  } 
              });
              floor_obj_length++;
            }
        });

        console.log(modelNames);
        console.log('Min rooms: ' + min_rooms + ' Max rooms: ' + max_rooms);


        console.log('flats_without_concessions : ' + flats_without_concessions);

        function set_mesh_base_color (mesh) {
            if (mesh.material.length == undefined) {
                if (mesh.material.name.search(emissive_mat_name) != -1) {
                    mesh.material.emissive.setHex('0x' + mesh.material.color.getHexString());
                    mesh.material.emissiveIntensity = 1;
                }
                mesh.userData['base_color_' ] = mesh.material.color.getHexString();
            } else {
                var metarial_i = 0;
                while (metarial_i < mesh.material.length) {
                    if (mesh.material[metarial_i].name.search(emissive_mat_name) != -1) {
                        mesh.material[metarial_i].emissive.setHex('0x' + mesh.material[metarial_i].color.getHexString());
                        mesh.material[metarial_i].emissiveIntensity = 1;
                    }
                    mesh.userData['base_color_' + metarial_i] = mesh.material[metarial_i].color.getHexString();
                    metarial_i++;
                }
            }
        }



        // apply_textures (window.ground, material_flat_arr);
        window.floor_obj.length = floor_obj_length;
        var appartment_id = 2;
        var looring_index = 0;
        $('.flat-plan .toggle-btn').removeClass('active');
        $('.flat-plan').removeClass('active');
        $('#c').removeClass('active');
            setTimeout(function(){
                $('.left-floors-selector').html('');
                window.floor_obj.forEach(function(floor, floor_index){
                    world_y_position_of_floors[floor_index] = floor[0].children[0].getWorldPosition(vector_to_world_position).y;

                    var flat_name_number = floor_index + 1;
                    if  (flat_name_number < 10) {
                        flat_name_number =   '0' + String(flat_name_number);
                    }
                    var active_class = '';
                    if (floor_index == current_floor) {
                        active_class =  'active';
                    }
                    var selector_text = '<div class="floor-selector-item ' + active_class +'" data-floor="' + floor_index + '"><span class="number">' + flat_name_number + '</span><span class="text">Floor</span></div>';

                    $('.left-floors-selector').append(selector_text);


                });
                $('.left-floors-selector .floor-selector-item').mouseup(floor_selector_mouse_up_fn);
            },500);


       

            let local_lobby =  window.lobby;
            let lobby_Glass_det = local_lobby.children[0];
            lobby_Glass_det.material[4].map = panel_texture;
            lobby_Glass_det.material[4].color.setColorName('white');
            let lobby_Windows = local_lobby.children[1];
            lobby_Windows.material.color.setColorName('black');
            let lobby_Floor = local_lobby.children[2];
            let lobby_Glass = local_lobby.children[3];
           // lobby_Glass.material.color.setHex('0x005aff');
            lobby_Glass.material.color.setColorName('white');
            lobby_Glass.material.envMap = reflection_material;
            lobby_Glass.material.opacity = glass_base_opacity;
            // lobby_Glass.visible = false;
            let lobby_Wentilation = local_lobby.children[4];
            // lobby_Wentilation.material.color.setColorName('white');
            lobby_Wentilation.material.map = panel_texture;
            let lobby_Decoration = local_lobby.children[5];
            lobby_Decoration.material.color.setColorName('white');
            lobby_Decoration.material.map = beton_texture;
            let lobby_Wall = local_lobby.children[6];
            lobby_Wall.material[0].color.setColorName('white');
            lobby_Wall.material[0].map = beton_texture;
            lobby_Wall.material[1].color.setColorName('white');
            lobby_Wall.material[1].map = beton_texture;

            let local_roof = window.roof;
            let roof_panel_roof = local_roof.children[0];
                roof_panel_roof.material.color.setColorName('white');
                roof_panel_roof.material.map = panel_texture;
            let wall_roof = local_roof.children[1];
            wall_roof.material.color.setColorName('white');
            wall_roof.material.map = beton_texture;
            let glass_roof = local_roof.children[2];
           // glass_roof.material.color.setHex('0x23295');
            glass_roof.material.color.setColorName('white');
            glass_roof.material.specular.setColorName('black');
            glass_roof.material.shininess = 100;
            glass_roof.material.envMap = reflection_material;
            glass_roof.material.opacity = glass_base_opacity;
            glass_roof.material.transparent = true;
            glass_roof.material.side = 2;

            let det_roof = local_roof.children[3];
                det_roof.material.color.setColorName('white');
                det_roof.material.map = beton_texture;
            let floor_roof = local_roof.children[4];
            let windows_roof = local_roof.children[5];
                windows_roof.material.color.setColorName('black');
            let wire = local_roof.children[6];
            let went = local_roof.children[7];
            console.log(materials_array);
          window.floor_obj.forEach(function(item, i){
                item[0].parent.children.forEach(function(children){
                    if (children.name.search('hall_') == -1) {


                        children.material.forEach(function(material){
                            if (material.name == "balckony") {
                                if (i < 3) {
                                    material.lightMap = materials_array['texture_0'];
                                } else if (i < 7) {
                                    material.lightMap = materials_array['texture_2'];
                                }
                                else if (i < 16) {
                                    material.lightMap = materials_array['texture_3'];
                                }
                                else if (i < 39) {
                                    material.lightMap = materials_array['texture_4'];
                                }

                            }
                        });
                    };
                });
            });
    },
    function ( xhr ) {
        progress_bar_update (2, Math.round(xhr.loaded / xhr.total * 100) , 'Load model ' +  Math.round(xhr.loaded / xhr.total * 100) + '%')
        $('.preloader .percents').html('Load model ' +  Math.round(xhr.loaded / xhr.total * 100) + '%');
    });




    function find_n_clone_material (object_to_work, object_from_clone) {
        if (object_to_work.children.length == 0) {
            var material_length = object_to_work.material.length;
            if (material_length == undefined) {
                object_to_work.material= object_from_clone.material.clone();
            } else {
                object_to_work.material = [];
                var while_counter = 0;
                while (while_counter < material_length) {
                    object_to_work.material[while_counter] = object_from_clone.material[while_counter].clone();
                    while_counter++;
                }
            }

        }
    }
}

function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}