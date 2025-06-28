import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, <h5 className='error-msg'>نام نمی تواند کمتر از 5 کاراکتر باشد</h5>)
        .required(<h5 className='error-msg'>وارد کردن این مقدار الزامی است</h5>),
    pass: Yup.string()
        .min(4, <h5 className='error-msg'> گدرواژه حداقل باید 4 کاراکتر باشد</h5>)
        .required(<h5 className='error-msg'>وارد کردن این مقدار الزامی است</h5>),
    capcha: Yup.boolean()
        .oneOf([true],
            <h5 className='error-msg'>کد اعتبارسنجی درست نیست</h5>
        )
        .required(<h5 className='error-msg'>لطفا کد را وارد کنید</h5>)
})

const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, <h5 className='error-msg'>نام نمی تواند کمتر از 5 کاراکتر باشد</h5>)
        .required(<h5 className='error-msg'>وارد کردن این مقدار الزامی است</h5>),
    pass: Yup.string()
        .min(4, <h5 className='error-msg'> گدرواژه حداقل باید 4 کاراکتر باشد</h5>)
        .required(<h5 className='error-msg'>وارد کردن این مقدار الزامی است</h5>)
    ,
    confirm: Yup.string()
        .required(<h5 className='error-msg'>وارد کردن این مقدار الزامی است</h5>)
        .oneOf([Yup.ref('pass'), null],
            <h5 className='error-msg'>گدرواژه با تکرار مطابقت ندارد</h5>
        ),
    capcha: Yup.boolean()
        .oneOf([true],
            <h5 className='error-msg'>کد اعتبارسنجی درست نیست</h5>
        )
        .required(<h5 className='error-msg'>لطفا کد را وارد کنید</h5>
        ),
})

export { loginSchema, registerSchema }