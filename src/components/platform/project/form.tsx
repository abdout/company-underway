'use client';

import { useState, useEffect, useCallback, useActionState, startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectFormSchema, type ProjectFormValues } from './valid';
import { createProject } from './actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Save, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { systemActivities, TEAM_MEMBERS, TEAM_LEADS, KITS, CARS, type SystemType } from './constant';
import { type ActivityCategory, type ActivityWithSystem, type ProjectCreateFormProps } from './types';
import { useRouter } from 'next/navigation';

export default function ProjectCreateForm({ onSuccess }: ProjectCreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSystems, setSelectedSystems] = useState<SystemType[]>([]);
  const [activeSystemTab, setActiveSystemTab] = useState<SystemType | null>(null);
  const router = useRouter();
  
  // Define the action functions for activity selection
  const selectActivity = async (previousState: ActivityWithSystem[], formData: FormData) => {
    const system = formData.get('system') as SystemType;
    const category = formData.get('category') as string;
    const subcategory = formData.get('subcategory') as string;
    const activity = formData.get('activity') as string;
    const checked = formData.get('checked') === 'true';

    if (checked) {
      // Add the activity
      return [...previousState, { system, category, subcategory, activity }];
    } else {
      // Remove the activity
      return previousState.filter(a => 
        !(a.system === system &&
          a.category === category && 
          a.subcategory === subcategory && 
          a.activity === activity)
      );
    }
  };

  const selectAllActivities = async (previousState: ActivityWithSystem[], formData: FormData) => {
    const system = formData.get('system') as SystemType;
    const category = formData.get('category') as string;
    const subcategory = formData.get('subcategory') as string;
    const activities = JSON.parse(formData.get('activities') as string) as ActivityWithSystem[];

    // Remove existing activities for this category/subcategory
    const filteredPrev = previousState.filter(a => 
      !(a.system === system && 
        a.category === category && 
        (!subcategory || a.subcategory === subcategory))
    );
    
    // Add new activities
    return [...filteredPrev, ...activities];
  };

  const unselectAllActivities = async (previousState: ActivityWithSystem[], formData: FormData) => {
    const system = formData.get('system') as SystemType;
    const category = formData.get('category') as string;
    const subcategory = formData.get('subcategory') as string;

    if (subcategory) {
      // Remove activities for specific subcategory
      return previousState.filter(a => 
        !(a.system === system && 
          a.category === category && 
          a.subcategory === subcategory)
      );
    } else {
      // Remove all activities for the category
      return previousState.filter(a => 
        !(a.system === system && a.category === category)
      );
    }
  };

  // Use useActionState for activity selection
  const [selectedActivities, selectActivityAction] = useActionState(selectActivity, []);
  const [, selectAllAction] = useActionState(selectAllActivities, []);
  const [, unselectAllAction] = useActionState(unselectAllActivities, []);
  
  // Track selected categories per system
  const [selectedCategories, setSelectedCategories] = useState<Record<SystemType, string[]>>({
    'MV SWGR': [],
    'HV SWGR': [],
    'LV SWGR': [],
    'POWER TRAFO': [],
    'DIST. TRAFO': [],
    'COMPONENT': [],
    'RELAY': [],
    'RMU': [],
    'LOW CURRENT': []
  });
  
  // Track selected subcategories per system and category
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<SystemType, Record<string, string[]>>>({
    'MV SWGR': {},
    'HV SWGR': {},
    'LV SWGR': {},
    'POWER TRAFO': {},
    'DIST. TRAFO': {},
    'COMPONENT': {},
    'RELAY': {},
    'RMU': {},
    'LOW CURRENT': {}
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      customer: '',
      description: '',
      location: '',
      client: '',
      consultant: '',
      status: 'neutral',
      priority: 'neutral',
      phase: 'approved',
      team: [],
      teamLead: '',
      systems: [],
      activities: [],
      mobilization: '',
      accommodation: '',
      kits: [],
      cars: [],
    },
  });

  useEffect(() => {
    // When selected systems change, update the form value
    if (selectedSystems.length > 0) {
      form.setValue('systems', selectedSystems, { shouldValidate: false });
    }
    
    // If we have systems but no active tab, set the first system as active
    if (selectedSystems.length > 0 && !activeSystemTab) {
      setActiveSystemTab(selectedSystems[0]);
    } else if (selectedSystems.length === 0) {
      // If no systems are selected, clear the active tab
      setActiveSystemTab(null);
    } else if (!selectedSystems.includes(activeSystemTab as SystemType)) {
      // If the active tab is not in selected systems anymore, update active tab
      setActiveSystemTab(selectedSystems[0]);
    }
  }, [selectedSystems, activeSystemTab]);

  // Separate effect for form value updates
  useEffect(() => {
    if (selectedSystems.length > 0) {
      form.setValue('systems', selectedSystems, { shouldValidate: false });
    }
  }, [selectedSystems, form]);

  const onSubmit = async (data: ProjectFormValues) => {
    console.log('=== Form Submission Debug Logs ===');
    console.log('Form submission started');
    console.log('Form data:', JSON.stringify(data, null, 2));
    console.log('Selected systems:', selectedSystems);
    console.log('Selected activities:', JSON.stringify(selectedActivities, null, 2));
    console.log('Selected categories:', JSON.stringify(selectedCategories, null, 2));
    console.log('Selected subcategories:', JSON.stringify(selectedSubcategories, null, 2));
    
    setIsSubmitting(true);
    try {
      console.log('Preparing to call createProject with data:', {
        ...data,
        systems: selectedSystems,
        activities: selectedActivities
      });
      
      const result = await createProject({
        ...data,
        systems: selectedSystems,
        activities: selectedActivities
      });

      console.log('createProject result:', JSON.stringify(result, null, 2));

      if (result.success) {
        console.log('Project created successfully');
        toast.success('Project created successfully!');
        form.reset();
        setSelectedSystems([]);
        setSelectedCategories({
          'MV SWGR': [],
          'HV SWGR': [],
          'LV SWGR': [],
          'POWER TRAFO': [],
          'DIST. TRAFO': [],
          'COMPONENT': [],
          'RELAY': [],
          'RMU': [],
          'LOW CURRENT': []
        });
        setSelectedSubcategories({
          'MV SWGR': {},
          'HV SWGR': {},
          'LV SWGR': {},
          'POWER TRAFO': {},
          'DIST. TRAFO': {},
          'COMPONENT': {},
          'RELAY': {},
          'RMU': {},
          'LOW CURRENT': {}
        });
        setActiveSystemTab(null);
        if (onSuccess) {
          onSuccess();
        }
        // Redirect to project page
        router.push('/platform/project');
      } else {
        console.error('Failed to create project:', result.message);
        toast.error(result.message || 'Failed to create project');
      }
    } catch (error: any) {
      console.error('Error during project creation:', error);
      console.error('Error details:', {
        name: error?.name || 'Unknown',
        message: error?.message || 'No error message',
        stack: error?.stack || 'No stack trace'
      });
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize handlers to prevent unnecessary rerenders
  const handleSystemToggle = useCallback((system: SystemType) => {
    setSelectedSystems(prev => {
      if (prev.includes(system)) {
        // If system is already selected, remove it and all its activities
        const formData = new FormData();
        formData.append('system', system);
        formData.append('category', '*'); // Use wildcard to remove all activities for this system
        startTransition(() => {
          unselectAllAction(formData);
        });
        // Clear selected categories for this system
        setSelectedCategories(prev => ({
          ...prev,
          [system]: []
        }));
        setSelectedSubcategories(prev => ({
          ...prev,
          [system]: {}
        }));
        return prev.filter(s => s !== system);
      } else {
        // If system is not yet selected, add it
        return [...prev, system];
      }
    });
  }, [setSelectedSystems, setSelectedCategories, setSelectedSubcategories, unselectAllAction]);

  // Handle category toggle
  const handleCategoryToggle = useCallback((system: SystemType, category: string) => {
    const systemCategories = selectedCategories[system] || [];
    const isSelected = systemCategories.includes(category);
    const categoryData = systemActivities[system].find(c => c.item === category);

    // Update categories first
    setSelectedCategories(prev => ({
      ...prev,
      [system]: isSelected 
        ? systemCategories.filter(c => c !== category)
        : [...systemCategories, category]
    }));

    // Update subcategories
    setSelectedSubcategories(prev => ({
      ...prev,
      [system]: {
        ...prev[system],
        [category]: isSelected ? [] : categoryData?.subitems.map(subitem => subitem.name) || []
      }
    }));

    // Handle activities
    const formData = new FormData();
    formData.append('system', system);
    formData.append('category', category);

    if (isSelected) {
      startTransition(() => {
        unselectAllAction(formData);
      });
    } else if (categoryData) {
      const newActivities: ActivityWithSystem[] = [];
      categoryData.subitems.forEach(subcategory => {
        subcategory.activities.forEach(activity => {
          newActivities.push({
            system,
            category,
            subcategory: subcategory.name,
            activity
          });
        });
      });
      formData.append('activities', JSON.stringify(newActivities));
      startTransition(() => {
        selectAllAction(formData);
      });
    }
  }, [selectedCategories, systemActivities, selectAllAction, unselectAllAction]);

  // Handle subcategory toggle
  const handleSubcategoryToggle = useCallback((system: SystemType, category: string, subcategory: string) => {
    setSelectedSubcategories(prev => {
      const categorySubcategories = prev[system]?.[category] || [];
      const isSelected = categorySubcategories.includes(subcategory);

      if (isSelected) {
        // Remove subcategory and filter out related activities
        const formData = new FormData();
        formData.append('system', system);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        startTransition(() => {
          unselectAllAction(formData);
        });
      }

      return {
        ...prev,
        [system]: {
          ...prev[system],
          [category]: isSelected 
            ? categorySubcategories.filter(s => s !== subcategory)
            : [...categorySubcategories, subcategory]
        }
      };
    });
  }, [unselectAllAction]);

  // Handle initial selection
  useEffect(() => {
    if (selectedSystems.length > 0) {
      // Batch the activity selections
      const formData = new FormData();
      const allActivities: ActivityWithSystem[] = [];
      
      selectedSystems.forEach(system => {
        const categories = systemActivities[system];
        categories.forEach(category => {
          category.subitems.forEach(subcategory => {
            subcategory.activities.forEach(activity => {
              allActivities.push({
                system,
                category: category.item,
                subcategory: subcategory.name,
                activity
              });
            });
          });
        });
      });

      if (allActivities.length > 0) {
        formData.append('activities', JSON.stringify(allActivities));
        startTransition(() => {
          selectAllAction(formData);
        });
      }
    }
  }, [selectedSystems, systemActivities, selectAllAction]);

  const systemOptions: SystemType[] = ['MV SWGR', 'HV SWGR', 'LV SWGR', 'POWER TRAFO', 'DIST. TRAFO', 'COMPONENT', 'RELAY', 'RMU', 'LOW CURRENT'];

  return (
    <ScrollArea className="h-full max-h-screen pr-4">
      <div className="container mx-auto py-8 px-10 max-w-5xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            
            {/* General Information Section */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">General</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Customer</FormLabel>
                      <FormControl>
                        <Input placeholder="Customer" {...field} className="bg-muted/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Client</FormLabel>
                      <FormControl>
                        <Input placeholder="Client" {...field} className="bg-muted/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consultant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Consultant</FormLabel>
                      <FormControl>
                        <Input placeholder="Consultant" {...field} className="bg-muted/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Location" {...field} className="bg-muted/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            
            {/* Activities Section */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Activity</h2>
              <div className=" rounded-lg bg-muted/20">
                {/* System Selection */}
                <div className="space-y-4 mb-4">
                  <FormLabel className="text-sm font-medium">Systems</FormLabel>
                  <FormMessage>{form.formState.errors.systems?.message}</FormMessage>
                  <div className="flex flex-wrap gap-4    ">
                    {systemOptions.map((system) => (
                      <Button
                        key={system} 
                        type="button"
                        variant="outline"
                        className={cn(
                          "transition-opacity text-xs px-2 py-1",
                          selectedSystems.includes(system) 
                            ? "opacity-100 border-primary bg-primary/10" 
                            : "opacity-70 hover:opacity-100"
                        )}
                        onClick={() => handleSystemToggle(system)}
                      >
                        {system}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Activities Selection - shown only if systems are selected */}
                {selectedSystems.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <FormLabel className="text-sm font-medium">Activities</FormLabel>
                    <FormMessage>{form.formState.errors.activities?.message}</FormMessage>
                    
                    <Tabs 
                      value={activeSystemTab || undefined} 
                      onValueChange={(value) => setActiveSystemTab(value as SystemType)}
                      className="w-full"
                    >
                      <TabsList className="mb-4 w-full justify-start overflow-auto">
                        {selectedSystems.map((system) => (
                          <TabsTrigger key={system} value={system}>
                            {system}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {selectedSystems.map((system) => (
                        <TabsContent key={system} value={system} className="mt-2">
                          {/* Equipment Categories Selection */}
                          <div className="mb-6">
                            <h3 className="text-sm font-medium mb-2">Select Equipment Types:</h3>
                            <div className="flex flex-wrap gap-3">
                              {systemActivities[system].map((category: ActivityCategory) => (
                                <div 
                                  key={`${system}-category-${category.item}`} 
                                  className={cn(
                                    "flex items-center px-3 py-1.5 rounded-md space-x-2 cursor-pointer transition-colors",
                                    selectedCategories[system]?.includes(category.item) 
                                      ? "bg-primary/20 border border-primary/50" 
                                      : "bg-muted/50 hover:bg-muted/80"
                                  )}
                                  onClick={() => handleCategoryToggle(system, category.item)}
                                >
                                  <label
                                    className="text-sm font-medium cursor-pointer w-full"
                                  >
                                    {category.item}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Only show categories that are selected */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {systemActivities[system]
                              .filter((category: ActivityCategory) => selectedCategories[system]?.includes(category.item))
                              .map((category: ActivityCategory) => (
                                <Accordion 
                                  key={`${system}-${category.item}-accordion`} 
                                  type="multiple" 
                                  className={cn(
                                    "w-full",
                                    (system === 'MV SWGR' || system === 'HV SWGR') && category.item === "Relay" ? "md:col-span-2" : ""
                                  )}
                                >
                                  <AccordionItem 
                                    value={`${system}-${category.item}`} 
                                    className="border-b border-muted/60"
                                  >
                                    <AccordionTrigger className="font-semibold hover:bg-muted/20 px-4 rounded-md">
                                      {category.item}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      {category.item === "Relay" ? (
                                        <>
                                          {/* Subcategory Selection for Relay */}
                                          <div className="mb-6">
                                            <h4 className="text-sm font-medium mb-2">Select {category.item} Types:</h4>
                                            <div className="flex flex-wrap gap-3">
                                              {category.subitems.map((subcategory: { name: string; activities: string[] }) => (
                                                <div 
                                                  key={`${system}-${category.item}-subcategory-${subcategory.name}`} 
                                                  className={cn(
                                                    "flex items-center px-3 py-1.5 rounded-md space-x-2 cursor-pointer transition-colors",
                                                    selectedSubcategories[system]?.[category.item]?.includes(subcategory.name)
                                                      ? "bg-primary/20 border border-primary/50" 
                                                      : "bg-muted/50 hover:bg-muted/80"
                                                  )}
                                                  onClick={() => handleSubcategoryToggle(system, category.item, subcategory.name)}
                                                >
                                                  <label className="text-sm font-medium cursor-pointer w-full">
                                                    {subcategory.name}
                                                  </label>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          {/* Show only selected subcategories for Relay */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            {category.subitems
                                              .filter((subcategory: { name: string; activities: string[] }) => selectedSubcategories[system]?.[category.item]?.includes(subcategory.name))
                                              .map((subcategory: { name: string; activities: string[] }) => (
                                                <div key={`${system}-${category.item}-${subcategory.name}`} className="space-y-2 p-3 rounded-md bg-muted/10 hover:bg-muted/20">
                                                  <h4 className="text-sm font-medium">{subcategory.name}</h4>
                                                  <div className="space-y-1">
                                                    {subcategory.activities.map((activity: string) => {
                                                      const isSelected = selectedActivities.some(
                                                        a => a.system === system &&
                                                            a.category === category.item && 
                                                            a.subcategory === subcategory.name && 
                                                            a.activity === activity
                                                      );
                                                      return (
                                                        <div 
                                                          key={`${system}-${category.item}-${subcategory.name}-${activity}`} 
                                                          className={cn(
                                                            "flex items-center px-3 py-1.5 rounded-md",
                                                            isSelected ? "bg-primary/20" : "bg-muted/50 hover:bg-muted/80"
                                                          )}
                                                        >
                                                          <div className="flex items-center w-full">
                                                            <Checkbox
                                                              id={`${system}-${category.item}-${subcategory.name}-${activity}`}
                                                              checked={isSelected}
                                                              onCheckedChange={(checked) => {
                                                                const formData = new FormData();
                                                                formData.append('system', system);
                                                                formData.append('category', category.item);
                                                                formData.append('subcategory', subcategory.name);
                                                                formData.append('activity', activity);
                                                                formData.append('checked', checked.toString());
                                                                startTransition(() => {
                                                                  selectActivityAction(formData);
                                                                });
                                                              }}
                                                              onClick={(e) => e.stopPropagation()}
                                                              className="mr-2"
                                                            />
                                                            <label
                                                              htmlFor={`${system}-${category.item}-${subcategory.name}-${activity}`}
                                                              className="text-sm cursor-pointer flex-1"
                                                              onClick={(e) => e.stopPropagation()}
                                                            >
                                                              {activity}
                                                            </label>
                                                          </div>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                          
                                          {/* Show message if no subcategories selected for Relay */}
                                          {(!selectedSubcategories[system]?.[category.item]?.length) && (
                                            <div className="text-center py-6 text-muted-foreground bg-muted/10 rounded-md">
                                              Please select at least one {category.item.toLowerCase()} type to see available activities
                                            </div>
                                          )}
                                        </>
                                      ) : (
                                        // For non-Relay items, show activities directly
                                        <div className="space-y-4">
                                          <div className="flex gap-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const newActivities: ActivityWithSystem[] = [];
                                                category.subitems.forEach(subcategory => {
                                                  subcategory.activities.forEach(activity => {
                                                    newActivities.push({
                                                      system,
                                                      category: category.item,
                                                      subcategory: subcategory.name,
                                                      activity
                                                    });
                                                  });
                                                });
                                                const formData = new FormData();
                                                formData.append('system', system);
                                                formData.append('category', category.item);
                                                formData.append('activities', JSON.stringify(newActivities));
                                                startTransition(() => {
                                                  selectAllAction(formData);
                                                });
                                              }}
                                            >
                                              Select All
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const formData = new FormData();
                                                formData.append('system', system);
                                                formData.append('category', category.item);
                                                startTransition(() => {
                                                  unselectAllAction(formData);
                                                });
                                              }}
                                            >
                                              Unselect All
                                            </Button>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {category.subitems.map((subcategory: { name: string; activities: string[] }) => (
                                              <div key={`${system}-${category.item}-${subcategory.name}`} className="space-y-2 p-3 rounded-md bg-muted/10 hover:bg-muted/20">
                                                <div className="flex items-center justify-between mb-2">
                                                  <h4 className="text-sm font-medium">{subcategory.name}</h4>
                                                  <div className="flex gap-1">
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const newActivities: ActivityWithSystem[] = subcategory.activities.map(activity => ({
                                                          system,
                                                          category: category.item,
                                                          subcategory: subcategory.name,
                                                          activity
                                                        }));
                                                        const formData = new FormData();
                                                        formData.append('system', system);
                                                        formData.append('category', category.item);
                                                        formData.append('subcategory', subcategory.name);
                                                        formData.append('activities', JSON.stringify(newActivities));
                                                        startTransition(() => {
                                                          selectAllAction(formData);
                                                        });
                                                      }}
                                                    >
                                                      Select All
                                                    </Button>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const formData = new FormData();
                                                        formData.append('system', system);
                                                        formData.append('category', category.item);
                                                        formData.append('subcategory', subcategory.name);
                                                        startTransition(() => {
                                                          unselectAllAction(formData);
                                                        });
                                                      }}
                                                    >
                                                      Unselect All
                                                    </Button>
                                                  </div>
                                                </div>
                                                <div className="space-y-1">
                                                  {subcategory.activities.map((activity: string) => {
                                                    const isSelected = selectedActivities.some(
                                                      a => a.system === system &&
                                                          a.category === category.item && 
                                                          a.subcategory === subcategory.name && 
                                                          a.activity === activity
                                                    );
                                                    return (
                                                      <div 
                                                        key={`${system}-${category.item}-${subcategory.name}-${activity}`} 
                                                        className={cn(
                                                          "flex items-center px-3 py-1.5 rounded-md",
                                                          isSelected ? "bg-primary/20" : "bg-muted/50 hover:bg-muted/80"
                                                        )}
                                                      >
                                                        <div className="flex items-center w-full">
                                                          <Checkbox
                                                            id={`${system}-${category.item}-${subcategory.name}-${activity}`}
                                                            checked={isSelected}
                                                            onCheckedChange={(checked) => {
                                                              const formData = new FormData();
                                                              formData.append('system', system);
                                                              formData.append('category', category.item);
                                                              formData.append('subcategory', subcategory.name);
                                                              formData.append('activity', activity);
                                                              formData.append('checked', checked.toString());
                                                              startTransition(() => {
                                                                selectActivityAction(formData);
                                                              });
                                                            }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="mr-2"
                                                          />
                                                          <label
                                                            htmlFor={`${system}-${category.item}-${subcategory.name}-${activity}`}
                                                            className="text-sm cursor-pointer flex-1"
                                                            onClick={(e) => e.stopPropagation()}
                                                          >
                                                            {activity}
                                                          </label>
                                                        </div>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}
              </div>
            </section>
            
            {/* Resources */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Resources</h2>
              <div className="space-y-8">
                {/* Team Information and Resources */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="teamLead"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-medium">Team Lead</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button 
                                variant="outline" 
                                role="combobox" 
                                className={cn(
                                  "w-full justify-between bg-muted/30",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? TEAM_LEADS.find(lead => lead.id === field.value)?.name
                                  : "Select team lead"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput placeholder="Search team leads..." />
                              <CommandEmpty>No team lead found.</CommandEmpty>
                              <CommandList>
                                <CommandGroup>
                                  {TEAM_LEADS.map((lead) => (
                                    <CommandItem
                                      key={lead.id}
                                      value={lead.name}
                                      onSelect={() => {
                                        form.setValue("teamLead", lead.id);
                                      }}
                                    >
                                      {lead.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Team Members</FormLabel>
                        <div className="space-y-3">
                          {field.value && field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {field.value.map((memberId) => {
                                const member = TEAM_MEMBERS.find(m => m.id === memberId);
                                return (
                                  <Badge key={memberId} variant="secondary" className="px-3 py-1">
                                    {member?.name}
                                    <button
                                      type="button"
                                      className="ml-2 text-muted-foreground hover:text-foreground"
                                      onClick={() => {
                                        const newValue = field.value?.filter(id => id !== memberId) || [];
                                        form.setValue('team', newValue);
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button 
                                  variant="outline" 
                                  type="button"
                                  className="w-full justify-between bg-muted/30"
                                >
                                  <span>Select team members</span>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Search team members..." />
                                <CommandEmpty>No member found.</CommandEmpty>
                                <CommandList>
                                  <CommandGroup>
                                    {TEAM_MEMBERS
                                      .filter(member => !field.value?.includes(member.id))
                                      .map((member) => (
                                        <CommandItem
                                          key={member.id}
                                          value={member.name}
                                          onSelect={() => {
                                            const newValue = [...(field.value || []), member.id];
                                            form.setValue('team', newValue);
                                          }}
                                        >
                                          {member.name}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobilization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Mobilization</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mobilization details" {...field} className="bg-muted/30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accommodation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Accommodation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter accommodation details" {...field} className="bg-muted/30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Kits</FormLabel>
                        <div className="space-y-3">
                          {field.value && field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {field.value.map((kitId) => {
                                const kit = KITS.find(k => k.id === kitId);
                                return (
                                  <Badge key={kitId} variant="secondary" className="px-3 py-1">
                                    {kit?.name}
                                    <button
                                      type="button"
                                      className="ml-2 text-muted-foreground hover:text-foreground"
                                      onClick={() => {
                                        const newValue = field.value?.filter(id => id !== kitId) || [];
                                        form.setValue('kits', newValue);
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button 
                                  variant="outline" 
                                  type="button"
                                  className="w-full justify-between bg-muted/30"
                                >
                                  <span>Select kits</span>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Search kits..." />
                                <CommandEmpty>No kit found.</CommandEmpty>
                                <CommandList>
                                  <CommandGroup>
                                    {KITS
                                      .filter(kit => !field.value?.includes(kit.id))
                                      .map((kit) => (
                                        <CommandItem
                                          key={kit.id}
                                          value={kit.name}
                                          onSelect={() => {
                                            const newValue = [...(field.value || []), kit.id];
                                            form.setValue('kits', newValue);
                                          }}
                                        >
                                          {kit.name}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cars"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Cars</FormLabel>
                        <div className="space-y-3">
                          {field.value && field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {field.value.map((carId) => {
                                const car = CARS.find(c => c.id === carId);
                                return (
                                  <Badge key={carId} variant="secondary" className="px-3 py-1">
                                    {car?.name}
                                    <button
                                      type="button"
                                      className="ml-2 text-muted-foreground hover:text-foreground"
                                      onClick={() => {
                                        const newValue = field.value?.filter(id => id !== carId) || [];
                                        form.setValue('cars', newValue);
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button 
                                  variant="outline" 
                                  type="button"
                                  className="w-full justify-between bg-muted/30"
                                >
                                  <span>Select cars</span>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Search cars..." />
                                <CommandEmpty>No car found.</CommandEmpty>
                                <CommandList>
                                  <CommandGroup>
                                    {CARS
                                      .filter(car => !field.value?.includes(car.id))
                                      .map((car) => (
                                        <CommandItem
                                          key={car.id}
                                          value={car.name}
                                          onSelect={() => {
                                            const newValue = [...(field.value || []), car.id];
                                            form.setValue('cars', newValue);
                                          }}
                                        >
                                          {car.name}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
            
            {/* Description */}
            <section>
              <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Description</h2>
              <div className="space-y-6">
                {/* Project Status Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Start Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="bg-muted/30"
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
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
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted/30">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="on_progress">On Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                            <SelectItem value="stuck">Stuck</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted/30">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Phase</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted/30">
                              <SelectValue placeholder="Select phase" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="start">Start</SelectItem>
                            <SelectItem value="half_way">Half Way</SelectItem>
                            <SelectItem value="almost_done">Almost Done</SelectItem>
                            <SelectItem value="handover">Handover</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Textarea */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter project description" 
                          className="min-h-[150px] bg-muted/30"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            
            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-6 rounded-md"
                disabled={isSubmitting}
                size="lg"
              >
                <Save className="mr-2 h-5 w-5" />
                {isSubmitting ? "Creating Project..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
} 