import React, {useState} from 'react'
import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DEPARTMENT_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";

const SubjectList = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const subjectTable =useTable<Subject>();
    return (
        <ListView>
            <Breadcrumb/>

            <h1 className={'page-title'}>Subjects</h1>
            <div className={'intro-row'}>
                <p>Quick access to metrics and management tools.</p>
                <div className={'actions-row'}>
                    <div className={'search-field'}>
                        <Search className={'search-icon'}/>

                        <input
                            type='text'
                            placeholder='Search by name'
                            className={'pl-10 pt-1 w-full'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={'flex gap-2 w-full sm:w-auto'}>
                        <Select value={selectedDepartment}
                                onValueChange={setSelectedDepartment}>
                            <SelectTrigger>
                                <SelectValue placeholder={'Filter by department'}/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={'All'}>
                                    All departments
                                </SelectItem>

                                {DEPARTMENT_OPTIONS.map((department)=>(
                                    <SelectItem value={department.value} key={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <CreateButton/>
                    </div>
                </div>
            </div>

            <DataTable table={subjectTable}>

            </DataTable>
        </ListView>
    )
}
export default SubjectList
