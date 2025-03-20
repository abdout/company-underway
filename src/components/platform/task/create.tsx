import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import ImageUpload from '@/components/upload/image';
import { useTask } from "./context";
import { useEffect, useState } from "react";
// import { useUpload } from "@/components/upload/context";
import { Icon } from "@iconify/react";
import SelectPopover from "@/components/atom/popover/popover";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { rank, ranks } from "./rank";
// import { interest, interests } from "./interest";
// import { skill, skills } from "./skill";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useRouter } from "next/navigation";
import Indicator from "@/components/atom/modal/indicator";
import Status from "../../nmbd-project/status";
import { club, clubs } from "../../nmbd-project/constant";
import EstTime from "./esttime";
import Priority from "./priority";

interface FormData {
    project: string;
    task: string;
    club: string;
    status: string;
    priority: string;
    duration: string;
    desc: string;
    label: string;
    tag: string;
    remark: string;
}

const formSchema = z.object({
    project: z.string(),
    task: z.string(),
    club: z.string(),
    status: z.string(),
    priority: z.string(),
    duration: z.string(),
    desc: z.string(),
    label: z.string(),
    tag: z.string(),
    remark: z.string(),
});

interface CreateProps {
    onClose: () => void;
}
const Create: React.FC<CreateProps> = ({ onClose }) => {
    const { refreshTasks } = useTask();
    // const { image } = useUpload();
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(prevStep => (prevStep < 4 ? prevStep + 1 : 4));
    };

    const prevStep = () => {
        setStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1));
    };

    const [, setProgress] = useState(0);
    useEffect(() => {
        const calculatedProgress = (step / 4) * 100;
        setProgress(calculatedProgress);
    }, [step]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            project: '',
            task: '',
            club: '',
            status: ' ',
            priority: '',
            duration: '',
            desc: '',
            label: '',
            tag: '',
            remark: '',
        },
    });



    // const [selectedRank, setSelectedRank] = useState<rank | null>(null);
    // const [selectedInterests, setSelectedInterests] = useState<interest | null>(null);
    // const [selectedSkills, setSelectedSkills] = useState<skill | null>(null);
    // const [selectedCountry, setSelectedCountry] = useState('');
    // const [cities, setCities] = useState<string[]>([]);
    const [selectedClub, setSelectedClub] = useState<club | null>(null);



    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            // document.body.style.overflow = '';
        };
    }, []);



    const handleSubmit = async (data: FormData) => {
        console.log("Form submitted", data);
        const postData = {
            ...data,
            club: selectedClub?.value, // Use the value of the selected lead
            // status: selectedStatus?.value, // Use the value of the selected status
            status: data.status,
            priority: data.priority,
        };

        const response = await fetch('/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        console.log(response);

        if (response.ok) {
            form.reset();
            setSelectedClub(null);
            refreshTasks();
            onClose();

        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='flex flex-col items-start justify-start gap-2 mb-8'>
                <h3 className="text-xl font-semibold">New Task</h3>
                <p className='text-sm text-muted-foreground mt-2'>
                    Create a new task for your project
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full max-w-md flex flex-col justify-center items-center gap-6 relative h-full"
                >
                    <Button
                        type='button'
                        size="icon"
                        variant='outline'
                        className={`absolute top-1/2 left-[-4rem] transform -translate-y-1/2 rounded-full ${step === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={prevStep}
                    >
                        <Icon icon="ic:sharp-arrow-back" width={25} />
                    </Button>
                    <Button
                        type='button'
                        size="icon"
                        variant='outline'
                        className={`absolute top-1/2 right-[-4rem] transform -translate-y-1/2 rounded-full ${step === 4 ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={nextStep}
                    >
                        <Icon icon="ic:sharp-arrow-forward" width={25} />
                    </Button>
                    
                    {/* Step indicators */}
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4].map((stepNum) => (
                            <div 
                                key={stepNum}
                                className={`w-2 h-2 rounded-full ${step === stepNum ? 'bg-black' : 'bg-gray-300'}`} 
                            />
                        ))}
                    </div>
                    
                    {step === 1 && (
                        <>
                            <FormField
                                control={form.control}
                                name="task"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder="Task Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className='h-20 w-full'
                                                placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormField
                                control={form.control}
                                name="project"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder="Project Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <EstTime
                                                value={field.value}
                                                onChange={(value) => form.setValue("duration", value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <FormField
                                control={form.control}
                                name="club"
                                render={() => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <SelectPopover
                                                items={clubs}
                                                selectedItem={selectedClub}
                                                setSelectedItem={(item) => {
                                                    setSelectedClub(item);
                                                    form.setValue("club", item?.value ?? "");
                                                }}
                                                placeholder="Select Department"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Status
                                                value={field.value}
                                                onChange={(value) => form.setValue("status", value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Priority
                                                value={field.value}
                                                onChange={(value) => form.setValue("priority", value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder="Label" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tag"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder="Tags" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="remark"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder="Remarks" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {step === 4 && (
                        <div className="w-full flex justify-center mt-4">
                            <Button
                                type='submit'
                                className="bg-black text-white w-32 hover:bg-gray-800"
                            >
                                Create Task
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default Create;
