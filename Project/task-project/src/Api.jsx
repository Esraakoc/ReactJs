import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7069/api',
  headers: {
    'Content-Type': 'application/json', 
  }, 
});

export const GetIssuesWithStatus = async () => {
  try {
    const response = await api.get('/issue/with-status');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateTaskStatus = (taskId, status,userId) => async(dispatch) => {

  try {
    const response = await api.put(`/issue/${taskId}/status`, {
      TaskId: taskId,
      Status: status,
      UserId: userId,
    });
    dispatch({ type: 'UPDATED_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserRole = async ()=>{
  try{
    const response =await api.get('/UserRoles/with-role-names');
    return response.data;
  } catch (error){
    throw error;
  }
};
export const login = (userInfo) => async (dispatch) => {
  try {
    const response = await api.post('/login', userInfo); 
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
    throw error;
  }
};
export const createIssue = (issueInfo)=>async (dispatch) => {
  try{
    const response = await api.post('/issue', issueInfo);
    dispatch({ type: 'CREATED_SUCCESS', payload: response.data });
    return response.data;
  }catch(error){
    console.error("API Error:", error.response ? error.response.data : error.message);
    dispatch({ type: 'CREATED_FAILURE', payload: error });
    throw error;
  }
}
export const updateTaskNotification = async (id, notification) => {
  try {
    const response = await api.put(`/tasklog/${id}/notification`, notification, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetTaskLog = async ()=>{
  try{
    const response = await api.get(`/tasklog`);
    return response.data;
  }catch(error){
    throw error;
  }
}
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/password/change-password', data);
    return response.data;
  } catch (error) { 
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/Password/request-password-reset', email, {
      headers: {
        'Content-Type': 'application/json' 
      }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const register = (userInfo) => async (dispatch) => {
  try {
    const response = await api.post('/register', userInfo);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error });
    throw error;
  }
};
export const UpdateIssueIsDeleted = async (taskId) => {
  try {
    await api.put(`/issue/${taskId}/delete`);
    return true;
  } catch (error) {
    console.error("Issue silme işlemi başarısız oldu:", error);
    return false;
  }
};
export const updateIssue = async (taskId, updatedData) => {
  try {
    const response = await api.put(`/issue/${taskId}`, updatedData); 
    return response.data;
  } catch (error) {
    console.error('Failed to update issue:', error);
    throw error;
  }
};
export const AddedTaskLog = (taskId, newAssignedto, newComment) => async(dispatch) => {
  try {
    const response = await api.post('/tasklog', { 
      taskId, 
      userId: newAssignedto, 
      comment: newComment 
    });
    dispatch({ type: 'ADDED_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'ADDED_FAILURE', payload: error });
    throw error;
  }
}
export const AddedUserRole = (userId, roleId) => async(dispatch)=>{
  try{
    const response = await api.post('/userroles', {
      userId,
      roleId
    });
    dispatch({ type: 'ADDED_SUCCESS', payload: response.data });
    return response.data;
      } catch(error){
        dispatch({ type: 'ADDED_FAILURE', payload: error });
        throw error;
      }
}
