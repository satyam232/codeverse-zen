
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import EditorPanel from '@/components/EditorPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, MessageSquare, FileText, Play, Clock, Check } from 'lucide-react';

const Editor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('problem');

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        <header className="border-b border-border/50 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Two Sum</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 rounded-full text-green-500 bg-green-500/10">Easy</span>
                <span className="text-xs text-muted-foreground">Acceptance Rate: 49.2%</span>
                <span className="text-xs text-muted-foreground">Submissions: 12.3M</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                Submit
              </Button>
              <Button size="sm">
                <Check className="h-4 w-4 mr-1" />
                Save Solution
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel - Problem Description */}
          <div className="md:w-1/2 lg:w-2/5 border-r border-border/50 flex flex-col">
            <Tabs defaultValue="problem" className="flex flex-col h-full" onValueChange={setActiveTab} value={activeTab}>
              <div className="border-b border-border/50">
                <TabsList className="w-full justify-start h-12 px-4 gap-4">
                  <TabsTrigger value="problem" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <FileText className="h-4 w-4 mr-2" />
                    Problem
                  </TabsTrigger>
                  <TabsTrigger value="discussion" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discussion
                  </TabsTrigger>
                  <TabsTrigger value="hints" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">
                    <Info className="h-4 w-4 mr-2" />
                    Hints
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="problem" className="flex-1 overflow-y-auto p-6 space-y-6 mt-0">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Problem Description</h2>
                  <p className="text-base leading-relaxed mb-4">
                    Given an array of integers <code className="bg-muted px-1 py-0.5 rounded">nums</code> and an integer <code className="bg-muted px-1 py-0.5 rounded">target</code>, return <em>indices of the two numbers such that they add up to <code className="bg-muted px-1 py-0.5 rounded">target</code></em>.
                  </p>
                  <p className="text-base leading-relaxed mb-4">
                    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                  </p>
                  <p className="text-base leading-relaxed">
                    You can return the answer in any order.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Examples</h3>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="font-medium mb-2">Example 1:</p>
                    <p className="mb-2">
                      <strong>Input:</strong> nums = [2,7,11,15], target = 9
                    </p>
                    <p className="mb-2">
                      <strong>Output:</strong> [0,1]
                    </p>
                    <p>
                      <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="font-medium mb-2">Example 2:</p>
                    <p className="mb-2">
                      <strong>Input:</strong> nums = [3,2,4], target = 6
                    </p>
                    <p className="mb-2">
                      <strong>Output:</strong> [1,2]
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="font-medium mb-2">Example 3:</p>
                    <p className="mb-2">
                      <strong>Input:</strong> nums = [3,3], target = 6
                    </p>
                    <p className="mb-2">
                      <strong>Output:</strong> [0,1]
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>2 ≤ <code className="bg-muted px-1 py-0.5 rounded">nums.length</code> ≤ 10<sup>4</sup></li>
                    <li>-10<sup>9</sup> ≤ <code className="bg-muted px-1 py-0.5 rounded">nums[i]</code> ≤ 10<sup>9</sup></li>
                    <li>-10<sup>9</sup> ≤ <code className="bg-muted px-1 py-0.5 rounded">target</code> ≤ 10<sup>9</sup></li>
                    <li>Only one valid answer exists.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Follow-up</h3>
                  <p className="text-base leading-relaxed">
                    Can you come up with an algorithm that is less than O(n²) time complexity?
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="discussion" className="flex-1 overflow-y-auto p-6 mt-0">
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Join the Discussion</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with other developers to discuss solutions and approaches
                  </p>
                  <Button>Start a Thread</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="hints" className="flex-1 overflow-y-auto p-6 mt-0">
                <div className="space-y-6">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Hint 1</h3>
                    <p>
                      A brute force approach would be to check every possible pair of numbers,
                      but this would be O(n²) time complexity. Can we do better?
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Hint 2</h3>
                    <p>
                      For each number in the array, what is the other number we need to find to reach the target sum?
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Hint 3</h3>
                    <p>
                      Consider using a hash map to store numbers we've seen so far and their indices.
                      This allows us to quickly look up if the complement exists.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Panel - Code Editor */}
          <div className="md:w-1/2 lg:w-3/5 flex flex-col h-full">
            <EditorPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
