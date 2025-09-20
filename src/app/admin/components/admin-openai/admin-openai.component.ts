import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IOpenAIConfigData, IOpenAiUserConversation, IOpenAiUserConversationData } from './interfaces/i-openai-setup';
import { BlOpenaiSetupRequestsService } from './services/requests/bl-openai-setup-requests.service';
import { AdminUseCases } from '../../../core/consts/use-cases';
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-admin-openai',
  standalone: false,
  templateUrl: './admin-openai.component.html',
  styleUrl: './admin-openai.component.css'
})
export class AdminOpenAIComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private requestsService: BlOpenaiSetupRequestsService,
    private alertService: ToastrService,
    private permissionService: PermissionService
  ) { }

  private subscription: Subscription = new Subscription();
  isInitialized: boolean = false;
  activeTab: number = 0;

  openAIForm: FormGroup;
  previousConfigs: IOpenAIConfigData[] = [];
  isTestingConfig: boolean = false;
  adminUseCases = AdminUseCases;

  conversations: IOpenAiUserConversation[] = [];
  selectedConversation: IOpenAiUserConversation | null = null;

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
    this.loadChatPreviews();
    this.isInitialized = true;
  }

  initializeForm(): void {
    this.openAIForm = this.formBuilder.group({
      model: ['gpt-3.5-turbo', [Validators.required]],
      prompt: ['', [Validators.required, Validators.minLength(10)]],
      isActive: [false]
    });
  }

  loadData(): void {
    if(!this.permissionService.has([this.adminUseCases.GetOpenAiConfig])) return;
    this.subscription.add(
      this.requestsService.getOpenAIConfig().subscribe({
        next: (data) => {
          this.previousConfigs = data.previousConf;
          this.openAIForm.patchValue({
            model: data.currentActive.model,
            prompt: data.currentActive.prompt,
            isActive: data.currentActive.isActive
          });
        }
      })
    );
  }

  loadChatPreviews(): void {
    if(!this.permissionService.has([this.adminUseCases.GetOpenAiUserConversations])) return;
    this.subscription.add(
      this.requestsService.getOpenAiUserConversations().subscribe({
        next: (data) => {
          this.conversations = data;
        }
      })
    );
  }

  saveConfiguration(): void {
    if(!this.permissionService.has([this.adminUseCases.CreateOpenAiConfig])) return;
    if (this.openAIForm.valid) {
      const formData = this.openAIForm.value;
      let config: IOpenAIConfigData = {
        ...formData,
      };

      this.subscription.add(
        this.requestsService.createOpenAIConfig(config).subscribe({
          next: (data) => {
            this.alertService.success('OpenAI configuration saved successfully');
            this.loadData();
          },
          error: (err) => {
          }
        })
      );
    } else {
      this.alertService.warning('Please fill in all required fields');
    }
  }


  selectPreviousConfig(config: IOpenAIConfigData): void {
    this.openAIForm.patchValue({
      model: config.model,
      prompt: config.prompt,
      isActive: config.isActive
    });
  }

  selectConversation(conversation: IOpenAiUserConversation): void {
    this.selectedConversation = conversation;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
