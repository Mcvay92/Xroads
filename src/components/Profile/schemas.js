import Schema from 'form-schema-validation';

const memberSchema = new Schema({
    role:{
        type: String,
        errorStyles: "alert"
   },
    _id:{
        type: String
   },
   name:{
        type: String,
        errorStyles: "alert"
   },
   major:{
        type: String,
         errorStyles: "alert"
    },
   linkedin:{ 
        type: String,
        errorStyles: "alert"
    }
});
export const profileSchema = new Schema({
    team_name: {
        type: String,
        required: true,
        errorStyles: "alert"
    },
    user_id: {
        type: String
    },
    role: {
        type: String
    },
    description: {
        type: String,
        errorStyles: "alert"
    },
    stage: {
        type: String,
        errorStyles: "alert"
    },
    start_date: {
        type: Date,
        errorStyles: "alert"
    },
    contact:{
        type: String,
        errorStyles: "alert"
    },
    logo: {
        type: String,
        errorStyles: "alert"
    },
    members: {
        type: [memberSchema]
    }
});