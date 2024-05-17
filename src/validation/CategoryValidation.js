// validationSchema.js
import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
    name: Yup.string()
        .required('Category Name is required')
        .min(2, 'Category Name must be at least 2 characters')
        .max(30, 'Category Name must be at most 30 characters')
        .trim('Category Name should not contain leading/trailing spaces'),
    image: Yup.mixed()
        .required('Category Image is required')
        .test('fileFormat', 'Supported formats are JPEG, PNG, and WEBP', function (value) {
            // Check if the file is one of the specified formats
            return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
        })
        .test('fileSize', 'File size is too large. Max size is 2MB', function(value){
            // Check if the file size is within the limit
            return value.size <= 2 * 1024 * 1024; // 2MB
        })
});


export const updateCategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Category Name must be at least 2 characters')
        .max(30, 'Category Name must be at most 30 characters'),
    image: Yup.mixed()
        .test('fileFormat', 'Supported formats are JPEG, PNG, and WEBP', function (value) {
            // إذا لم يتم تقديم ملف، فهو يمر بنجاح
            if (!value) return true;

            // قم بفحص نوع الملف إذا تم تقديمه
            return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
        })
        .test('fileSize',
         'File size is too large. Max size is 2MB',  
        function(value){
            if(!value)return true;

            return value && value.size <= 2 * 1024 * 1024; // 2MB
        })
});

